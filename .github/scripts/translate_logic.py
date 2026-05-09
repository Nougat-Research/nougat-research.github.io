import os
import re
import google.generativeai as genai
import subprocess

print(len(os.environ["GOOGLE_API_KEY"]))
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
model = genai.GenerativeModel('gemini-3.1-flash-lite-preview')

def extract_frontmatter(content: str) -> tuple[str, str]:
    """Extract YAML frontmatter from MDX content."""
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return "", content

def translate_frontmatter(frontmatter: str) -> str:
    """Translate frontmatter fields that need translation."""
    lines = frontmatter.split('\n')
    translated_lines = []
    
    for line in lines:
        if line.startswith('title:') or line.startswith('description:'):
            # Extract the value and translate it
            key, value = line.split(':', 1)
            value = value.strip()
            # Remove quotes if present
            if value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            elif value.startswith("'") and value.endswith("'"):
                value = value[1:-1]
            
            prompt = f"Translate this to English, keep it concise:\n\n{value}"
            response = model.generate_content(prompt)
            translated_value = response.text.strip()
            translated_lines.append(f'{key}: "{translated_value}"')
        else:
            # Keep other fields (date, author, tags) as-is
            translated_lines.append(line)
    
    return '\n'.join(translated_lines)

def translate_content():
    result = subprocess.check_output(['git', 'diff', '--name-only', 'HEAD^', 'HEAD'], text=True)
    new_posts = [f for f in result.splitlines() if f.startswith('src/posts/') and f.endswith('index.mdx') and '.en.mdx' not in f]

    for file_path in new_posts:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        frontmatter, body = extract_frontmatter(content)
        
        if not frontmatter:
            print(f"Warning: No frontmatter found in {file_path}")
            continue
        
        translated_frontmatter = translate_frontmatter(frontmatter)
        
        prompt = f"Translate this article from Spanish to English. Keep all Markdown formatting, code blocks, and React component tags intact. Do not modify frontmatter format:\n\n{body}"
        response = model.generate_content(prompt)
        translated_body = response.text
        
        translated_content = f"---\n{translated_frontmatter}\n---\n\n{translated_body}"
        
        out_path = file_path.replace('index.mdx', 'index.en.mdx')
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(translated_content)
        
        print(f"Translated: {file_path} → {out_path}")

if __name__ == "__main__":
    translate_content()

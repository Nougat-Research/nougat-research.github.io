import type { Post, PostFrontmatter } from '../types/post'
import type { ComponentType } from 'react'
import type { Lang } from './i18n'

// Vite resolves this glob at build time.
// Each entry is a lazy loader for one MDX file.
const modules = import.meta.glob<{
  default: ComponentType
  frontmatter: PostFrontmatter
}>('../posts/**/index*.mdx')

// Derive a slug from the file path:
// "../posts/hello-world/index.mdx" → "hello-world"
// "../posts/hello-world/index.en.mdx" → "hello-world"
function slugFromPath(path: string): string {
  const match = path.match(/\.\.\/posts\/(.+)\/index(?:\.\w+)?\.mdx$/)
  return match ? match[1] : path
}

// Get the language from path: returns 'en' for index.en.mdx, 'es' for index.mdx (default Spanish)
function getLangFromPath(path: string): Lang {
  const match = path.match(/\.\.\/posts\/.+\/index\.(\w+)\.mdx$/)
  return match ? (match[1] as Lang) : 'es' // Default to Spanish for index.mdx
}

// Build the full post list, eager-loading only frontmatter.
// The MDX component itself stays lazy until the post page mounts.
export async function getAllPosts(lang: Lang = 'en'): Promise<Post[]> {
  const posts = await Promise.all(
    Object.entries(modules).map(async ([path, load]) => {
      const mod = await load()
      const slug = slugFromPath(path)
      const fileLang = getLangFromPath(path)
      
      return {
        slug,
        fileLang,
        frontmatter: mod.frontmatter,
        load,
      }
    })
  )

  // For each slug, choose the best variant for the requested language
  const postsBySlug = new Map<string, (typeof posts)[0]>()
  
  for (const post of posts) {
    if (postsBySlug.has(post.slug)) {
      // For English: prefer index.en.mdx, fall back to index.mdx
      // For Spanish: prefer index.mdx, fall back to index.en.mdx
      if (lang === 'en') {
        if (post.fileLang === 'en') postsBySlug.set(post.slug, post)
      } else {
        if (post.fileLang === 'es') postsBySlug.set(post.slug, post)
      }
    } else {
      postsBySlug.set(post.slug, post)
    }
  }

  const selectedPosts = Array.from(postsBySlug.values()).map(p => ({
    slug: p.slug,
    frontmatter: p.frontmatter,
    load: p.load,
  }))

  return selectedPosts
    // Strip drafts in production
    .filter(p => import.meta.env.DEV || !p.frontmatter.draft)
    // Newest first
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))
}

export async function getPost(slug: string, lang: Lang = 'en'): Promise<Post | undefined> {
  // Try to find the post in the requested language first
  const posts = await getAllPosts(lang)
  let post = posts.find(p => p.slug === slug)

  // If not found in requested language, try the other language
  if (!post) {
    const otherLang = lang === 'en' ? 'es' : 'en'
    const otherPosts = await getAllPosts(otherLang)
    post = otherPosts.find(p => p.slug === slug)
  }

  return post
}

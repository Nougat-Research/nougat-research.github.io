import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

export default defineConfig({
  plugins: [
    // MDX must come before React so it transforms .mdx before Babel touches it
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          // Exports frontmatter as a named `frontmatter` const from each MDX file
          remarkMdxFrontmatter,
        ],
      }),
    },
    react(),
  ],
  // Set to '/repo-name/' if deploying to username.github.io/repo-name
  // Set to '/' if deploying to an org site (nougat-research.github.io)
  base: '/',
})

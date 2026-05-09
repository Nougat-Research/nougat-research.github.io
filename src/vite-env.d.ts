/// <reference types="vite/client" />

// Tell TypeScript what an imported .mdx file looks like
declare module '*.mdx' {
  import type { ComponentType } from 'react'
  import type { PostFrontmatter } from './types/post'

  const Component: ComponentType
  export const frontmatter: PostFrontmatter
  export default Component
}

export interface PostFrontmatter {
  title: string
  date: string          // ISO 8601, e.g. "2026-05-08"
  description: string
  author?: string
  tags?: string[]
  draft?: boolean       // if true, excluded from production builds
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  // Lazily loaded — call load() to get the component
  load: () => Promise<{ default: React.ComponentType; frontmatter: PostFrontmatter }>
}

import { useEffect, useState, type ComponentType } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPost } from '../lib/posts'
import { useI18n } from '../lib/i18n'
import { mdxComponents } from '../mdx-components'
import type { PostFrontmatter } from '../types/post'

export default function Post() {
  const { slug } = useParams<{ slug: string }>()
  const { lang } = useI18n()
  const [Component, setComponent] = useState<ComponentType<{ components: typeof mdxComponents }> | null>(null)
  const [frontmatter, setFrontmatter] = useState<PostFrontmatter | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    getPost(slug, lang).then(post => {
      if (!post) { setNotFound(true); return }
      post.load().then(mod => {
        setComponent(() => mod.default as ComponentType<{ components: typeof mdxComponents }>)
        setFrontmatter(mod.frontmatter)
      })
    })
  }, [slug, lang])

  if (notFound) {
    return (
      <div className="container" style={{ padding: '4rem 2rem' }}>
        <p>Post not found. <Link to="/blog">← Back to research</Link></p>
      </div>
    )
  }

  if (!Component || !frontmatter) {
    return (
      <div className="container" style={{ padding: '4rem 2rem' }}>
        <p className="loading-text">Loading…</p>
      </div>
    )
  }

  const date = new Date(frontmatter.date).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <article className="container" style={{ padding: '4rem 2rem' }}>
      <Link to="/blog" className="back-link">← Research</Link>

      <header className="post-header">
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <ul className="post-tags">
            {frontmatter.tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
        )}
        <h1 className="post-title">{frontmatter.title}</h1>
        <p className="post-meta">
          <time>{date}</time>
          {frontmatter.author && <> · {frontmatter.author}</>}
        </p>
        <p className="post-description">{frontmatter.description}</p>
      </header>

      <div className="prose">
        {/* Pass shared components — available in MDX without importing */}
        <Component components={mdxComponents} />
      </div>
    </article>
  )
}

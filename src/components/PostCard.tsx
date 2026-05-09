import { Link } from 'react-router-dom'
import type { Post } from '../types/post'

interface Props { post: Post }

export default function PostCard({ post }: Props) {
  const { slug, frontmatter: fm } = post
  const date = new Date(fm.date).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <article className="post-card">
      <time className="post-card-date">{date}</time>
      {fm.tags && fm.tags.length > 0 && (
        <ul className="post-card-tags">
          {fm.tags.map(tag => <li key={tag}>{tag}</li>)}
        </ul>
      )}
      <h2 className="post-card-title">
        <Link to={`/blog/${slug}`}>{fm.title}</Link>
      </h2>
      <p className="post-card-description">{fm.description}</p>
      <Link to={`/blog/${slug}`} className="post-card-read">
        Read →
      </Link>
    </article>
  )
}

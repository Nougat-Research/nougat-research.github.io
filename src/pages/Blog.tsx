import { useEffect, useState } from 'react'
import { getAllPosts } from '../lib/posts'
import { useI18n } from '../lib/i18n'
import PostCard from '../components/PostCard'
import type { Post } from '../types/post'

export default function Blog() {
  const { lang } = useI18n()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPosts(lang).then(p => { setPosts(p); setLoading(false) })
  }, [lang])

  return (
    <div className="container" style={{ padding: '4rem 2rem' }}>
      <h1 className="page-title">Research</h1>
      <p className="page-subtitle">
        Investigations into technology, media, and public affairs.
      </p>

      {loading && <p className="loading-text">Loading…</p>}

      {!loading && posts.length === 0 && (
        <p className="loading-text">No posts yet. Check back soon.</p>
      )}

      <div className="post-list" style={{ marginTop: '3rem' }}>
        {posts.map(post => <PostCard key={post.slug} post={post} />)}
      </div>
    </div>
  )
}

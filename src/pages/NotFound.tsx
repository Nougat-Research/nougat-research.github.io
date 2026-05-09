import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '6rem 2rem' }}>
      <p className="hero-eyebrow">404</p>
      <h1 className="page-title">Page not found.</h1>
      <p style={{ marginTop: '1rem', color: 'var(--ink-muted)' }}>
        <Link to="/">← Back home</Link>
      </p>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../lib/i18n'
import { getAllPosts } from '../lib/posts'
import PostCard from '../components/PostCard'
import type { Post } from '../types/post'

export default function Home() {
  const { t } = useI18n()
  const [recent, setRecent] = useState<Post[]>([])

  useEffect(() => {
    getAllPosts().then(posts => setRecent(posts.slice(0, 3)))
  }, [])

  // Scroll reveal
  const revealRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.12 }
    )
    revealRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [recent])

  function reveal(el: HTMLElement | null) {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  return (
    <>
      {/* ── Hero ── */}
      <header className="hero">
        <div className="container">
          <h1
            className="hero-h1"
            dangerouslySetInnerHTML={{ __html: t('hero_h1') }}
          />
          <p className="hero-body">{t('hero_body')}</p>
          <div className="hero-actions">
            <Link to="/blog" className="btn btn-primary">{t('btn_research')}</Link>
            <a
              className="btn btn-ghost"
              href="https://github.com/nougat-research"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* ── Latest posts ── */}
      {recent.length > 0 && (
        <section className="section" id="latest">
          <div className="container">
            <p className="section-label reveal" ref={reveal}>{t('section_latest')}</p>
            <div className="post-list">
              {recent.map(post => <PostCard key={post.slug} post={post} />)}
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <Link to="/blog" className="btn btn-ghost">{t('all_research')}</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── What we do ── */}
      <section className="section" id="about">
        <div className="container">
          <p className="section-label reveal" ref={reveal}>{t('section_what')}</p>
          <div className="two-col">
            <div className="reveal" ref={reveal}>
              <h2 className="two-col-h2">{t('research_h2')}</h2>
              <p className="two-col-p">{t('research_p')}</p>
            </div>
            <div className="reveal" ref={reveal}>
              <h2 className="two-col-h2">{t('media_h2')}</h2>
              <p className="two-col-p">{t('media_p')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="section" id="principles">
        <div className="container">
          <p className="section-label reveal" ref={reveal}>{t('section_principles')}</p>
          <div className="principles">
            <div className="principle reveal" ref={reveal}>
              <div className="principle-num">01</div>
              <h3>{t('p01_h')}</h3>
              <p>{t('p01_p')}</p>
            </div>
            <div className="principle reveal" ref={reveal}>
              <div className="principle-num">02</div>
              <h3>{t('p02_h')}</h3>
              <p>{t('p02_p')}</p>
            </div>
            <div className="principle reveal" ref={reveal}>
              <div className="principle-num">03</div>
              <h3>{t('p03_h')}</h3>
              <p>{t('p03_p')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

import { useEffect, useRef } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useI18n, type Lang } from '../lib/i18n'

export default function Layout() {
  const { t, lang, setLang } = useI18n()
  const logoRef = useRef<HTMLAnchorElement>(null)

  // Expand logo on load, collapse/expand on scroll direction
  useEffect(() => {
    const logo = logoRef.current
    if (!logo) return

    const timer = setTimeout(() => logo.classList.add('expanded'), 300)

    let lastScrollY = window.scrollY
    let ticking = false

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const currentY = window.scrollY
        if (currentY > lastScrollY && currentY > 60) {
          logo!.classList.remove('expanded')
        } else {
          logo!.classList.add('expanded')
        }
        lastScrollY = currentY
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      <nav>
        <div className="container">
          <NavLink to="/" className="logo" ref={logoRef} id="navLogo">
            n<span className="logo-mid">ougat</span><span className="logo-dot">.</span>
          </NavLink>
          <div className="nav-right">
            <ul>
              <li><NavLink to="/#about">{t('nav_about')}</NavLink></li>
              <li><NavLink to="/#principles">{t('nav_principles')}</NavLink></li>
              <li>
                <a href="https://github.com/nougat-research" target="_blank" rel="noopener">
                  GitHub
                </a>
              </li>
            </ul>
            <div className="lang-switcher">
              {(['en', 'es'] as Lang[]).map((l, i) => (
                <>
                  {i > 0 && <span key={`sep-${l}`} className="lang-sep">/</span>}
                  <button
                    key={l}
                    className={lang === l ? 'active' : undefined}
                    onClick={() => setLang(l)}
                  >
                    {l.toUpperCase()}
                  </button>
                </>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <NavLink to="/" className="logo">
                nougat<span className="logo-dot">.</span>
              </NavLink>
              <p className="footer-tagline">{t('footer_tagline')}</p>
              <a
                className="footer-opensource"
                href="https://github.com/nougat-research/nougat-research.github.io"
                target="_blank"
                rel="noopener"
              >
                <GitHubIcon />
                {t('footer_opensource_label')}
              </a>
            </div>

            <div className="footer-col">
              <h4>{t('footer_explore')}</h4>
              <ul>
                <li><NavLink to="/#about">{t('nav_about')}</NavLink></li>
                <li><NavLink to="/#principles">{t('nav_principles')}</NavLink></li>
                <li>
                  <a href="https://github.com/nougat-research" target="_blank" rel="noopener">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>{t('footer_legal_title')}</h4>
              <ul>
                <li>
                  <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">
                    {t('footer_content_license')}
                  </a>
                </li>
                <li>
                  <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">
                    {t('footer_code_license')}
                  </a>
                </li>
              </ul>
              <p className="footer-license-note">{t('footer_license_note')}</p>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-bottom-copy">{t('footer_copy')}</span>
          </div>
        </div>
      </footer>
    </>
  )
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

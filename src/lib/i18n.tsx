import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'es'

export const translations = {
  en: {
    nav_about:               'About',
    nav_principles:          'Principles',
    hero_h1:                 'Research that belongs to <em>everyone.</em>',
    hero_body:               'Nougat Research is an independent project investigating technology, media, and public affairs, and publishing its findings freely, for everyone.',
    btn_github:              'View on GitHub',
    btn_learn:               'Learn more',
    btn_research:            'Read the research',
    section_what:            'What we do',
    section_latest:          'Latest',
    research_h2:             'Nougat Research',
    research_p:              'Original investigations into topics of public interest, primarily technology, media, and public affairs. All research is published openly, free to read and free to use. Code produced in the process is open source.',
    media_h2:                'Nougat Media',
    media_p:                 'Editorial content built on top of Nougat Research. Articles, written analyses, and visual explainers that make research findings accessible to a general audience.',
    section_principles:      'Principles',
    p01_h:                   'Open by default',
    p01_p:                   'All research is published under open licenses. Code is open source. Nothing is paywalled.',
    p02_h:                   'Public interest first',
    p02_p:                   'Topics are chosen because they matter to people, not because they are convenient or popular.',
    p03_h:                   'Accessible writing',
    p03_p:                   'Findings are written for a general audience. No academic gatekeeping.',
    footer_tagline:          'Independent research, freely published.',
    footer_opensource_label: 'This site is open source',
    footer_explore:          'Explore',
    footer_legal_title:      'Legal',
    footer_content_license:  'Content — CC BY 4.0',
    footer_code_license:     'Code — MIT',
    footer_license_note:     'Research and articles are free to share and adapt with attribution.',
    footer_copy:             '© Nougat Research. All content openly licensed.',
    all_research:            'All research →',
  },
  es: {
    nav_about:               'Acerca de',
    nav_principles:          'Principios',
    hero_h1:                 'Investigación que pertenece a <em>todos.</em>',
    hero_body:               'Nougat Research es un proyecto independiente que investiga tecnología, medios y asuntos públicos, publicando sus hallazgos libremente, para todos.',
    btn_github:              'Ver en GitHub',
    btn_learn:               'Saber más',
    btn_research:            'Leer la investigación',
    section_what:            'Qué hacemos',
    section_latest:          'Reciente',
    research_h2:             'Nougat Research',
    research_p:              'Investigaciones originales sobre temas de interés público, principalmente tecnología, medios y asuntos públicos. Toda la investigación se publica abiertamente, libre de leer y de usar. El código producido es de código abierto.',
    media_h2:                'Nougat Media',
    media_p:                 'Contenido editorial basado en Nougat Research. Artículos, análisis escritos y explicaciones visuales que hacen accesibles los hallazgos al público general.',
    section_principles:      'Principios',
    p01_h:                   'Abierto por defecto',
    p01_p:                   'Toda la investigación se publica bajo licencias abiertas. El código es de código abierto. Nada está detrás de un muro de pago.',
    p02_h:                   'El interés público primero',
    p02_p:                   'Los temas se eligen porque importan a las personas, no porque sean convenientes o populares.',
    p03_h:                   'Escritura accesible',
    p03_p:                   'Los hallazgos están escritos para el público general. Sin barreras académicas.',
    footer_tagline:          'Investigación independiente, publicada libremente.',
    footer_opensource_label: 'Este sitio es de código abierto',
    footer_explore:          'Explorar',
    footer_legal_title:      'Legal',
    footer_content_license:  'Contenido — CC BY 4.0',
    footer_code_license:     'Código — MIT',
    footer_license_note:     'La investigación y los artículos son libres de compartir y adaptar con atribución.',
    footer_copy:             '© Nougat Research. Todo el contenido publicado abiertamente.',
    all_research:            'Toda la investigación →',
  },
} satisfies Record<Lang, Record<string, string>>

export type TranslationKey = keyof typeof translations.en

// ── Context ──────────────────────────────────────────────────────────────────

interface I18nContextValue {
  lang: Lang
  t: (key: TranslationKey) => string
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  function setLang(next: Lang) {
    setLangState(next)
    document.documentElement.lang = next
  }

  function t(key: TranslationKey) {
    return translations[lang][key] ?? key
  }

  return (
    <I18nContext.Provider value={{ lang, t, setLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}

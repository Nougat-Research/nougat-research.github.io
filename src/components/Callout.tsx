import type { ReactNode } from 'react'

type Kind = 'info' | 'warning' | 'note'

const icons: Record<Kind, string> = {
  info:    'ℹ',
  warning: '⚠',
  note:    '✎',
}

interface Props {
  type?: Kind
  children: ReactNode
}

export default function Callout({ type = 'note', children }: Props) {
  return (
    <aside className={`callout callout-${type}`} aria-label={type}>
      <span className="callout-icon" aria-hidden="true">{icons[type]}</span>
      <div className="callout-body">{children}</div>
    </aside>
  )
}

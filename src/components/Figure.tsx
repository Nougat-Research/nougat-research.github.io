interface Props {
  src: string
  alt: string
  caption?: string
}

export default function Figure({ src, alt, caption }: Props) {
  return (
    <figure className="figure">
      <img src={src} alt={alt} />
      {caption && <figcaption className="figure-caption">{caption}</figcaption>}
    </figure>
  )
}

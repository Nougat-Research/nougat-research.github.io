/**
 * Components made available to every MDX file without importing.
 * Pass this object as the `components` prop to the MDX component,
 * or use MDXProvider if you prefer a context approach.
 *
 * Usage in Post.tsx:
 *   <MDXComponent components={mdxComponents} />
 */
import Callout from './components/Callout'
import Figure from './components/Figure'

export const mdxComponents = {
  Callout,
  Figure,
}

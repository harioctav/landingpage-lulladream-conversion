import cx from '@/lib/cx'
import { shapeRatios, shapes } from '@/lib/assets'

/**
 * Decorative shape. Always `aria-hidden` and never focusable — these carry no
 * information, so screen readers and the tab order must skip them.
 *
 * Takes a shape *name* rather than a URL so it can pair the file with its
 * intrinsic aspect ratio. Several source SVGs declare
 * `preserveAspectRatio="none"`, so a box of the wrong ratio visibly stretches
 * them; pinning `aspect-ratio` here makes that impossible.
 *
 * Hidden below `lg` by default — at narrow widths ornaments land on the copy.
 *
 * `tint` (on by default) flattens the artwork to solid white. These shapes were
 * drawn for a light page and carry dark outlines that turn muddy when faded
 * over the night surfaces; flattening keeps them reading as soft silhouettes.
 */
export default function Decor({
  name,
  className = '',
  float = false,
  tint = true,
  hideOnMobile = true,
}) {
  const src = shapes[name]
  if (!src) return null

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      draggable="false"
      style={{ aspectRatio: shapeRatios[name] }}
      className={cx(
        'pointer-events-none absolute h-auto select-none',
        tint && '[filter:brightness(0)_invert(1)]',
        hideOnMobile && 'hidden lg:block',
        float && 'animate-drift',
        className,
      )}
    />
  )
}

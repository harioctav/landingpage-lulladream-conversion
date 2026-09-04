import cx from '@/lib/cx'
import { brand } from '@/lib/assets'
import { site } from '@/data/content'

/**
 * Brand lockup. The supplied SVG carries the wordmark, so it is rendered as an
 * image with the product name as its alt text rather than re-set in type.
 * Its "DREAM" half is #333333, so it must sit on a light surface.
 */
export default function Logo({ className = '' }) {
  return (
    <img
      src={brand.logo}
      alt={site.name}
      width="4010"
      height="2127"
      // The source SVG is 4010×2127 with no viewBox, so it must never be left
      // to size itself. `object-contain` + `self-start` keep the lockup at its
      // true ratio even inside a column flex parent, which would otherwise
      // stretch it to the container width.
      className={cx('w-auto max-w-full self-start object-contain select-none', className)}
      draggable="false"
    />
  )
}

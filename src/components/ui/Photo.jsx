import cx from '@/lib/cx'

/**
 * Photograph clipped to one of the organic silhouettes.
 *
 * With `spin`, the silhouette turns slowly while the photograph stays upright:
 * the wrapper carries the clip-path and rotates, and the image counter-rotates
 * at the same rate. The image is scaled up inside the mask so the counter-turn
 * never exposes a corner. Both animations are stilled by the reduced-motion
 * rule in the base layer.
 */
export default function Photo({
  image,
  shape = 'blob-petal',
  spin = false,
  className = '',
  imgClassName = '',
}) {
  return (
    <div className={cx('relative isolate', shape, spin && 'animate-mask-spin', className)}>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className={cx(
          'size-full object-cover',
          spin && 'animate-mask-spin-reverse',
          imgClassName,
        )}
      />
    </div>
  )
}

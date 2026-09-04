import cx from '@/lib/cx'

/** Page-width container. */
export function Container({ className = '', children }) {
  return (
    <div className={cx('mx-auto w-full max-w-page px-s6 sm:px-8 lg:px-gutter', className)}>
      {children}
    </div>
  )
}

/** Vertical rhythm wrapper. `id` doubles as the in-page anchor target. */
export default function Section({ id, className = '', containerClassName = '', children, ...rest }) {
  return (
    <section
      id={id}
      className={cx('relative scroll-mt-24 py-20 sm:py-24 lg:py-section', className)}
      {...rest}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

/**
 * Section heading block. `onAccent` swaps to the on-purple text tokens; both
 * combinations are checked for contrast.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  body,
  align = 'center',
  onAccent = false,
  className = '',
  as: Tag = 'h2',
}) {
  return (
    <div
      className={cx(
        'flex flex-col gap-s5',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cx(
            'text-xs font-semibold uppercase tracking-[0.14em]',
            onAccent ? 'text-white' : 'text-action-primary-active',
          )}
        >
          {eyebrow}
        </p>
      )}

      <Tag
        id={id}
        className={cx(
          'max-w-3xl text-balance text-d3 sm:text-d2 lg:text-d1',
          onAccent ? 'text-white' : 'text-text-primary',
        )}
      >
        {title}
      </Tag>

      {body && (
        <p
          className={cx(
            'max-w-2xl text-pretty text-md sm:text-lg',
            onAccent ? 'text-white' : 'text-text-muted',
          )}
        >
          {body}
        </p>
      )}
    </div>
  )
}

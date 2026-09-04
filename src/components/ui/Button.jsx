import cx from '@/lib/cx'
import Icon from './Icon'

/**
 * Button / link-button.
 *
 * States covered (token contract requires all of them):
 *   default · hover · focus-visible · active · disabled · loading · error
 *
 * Pointer + touch: hit area is never below 44×44px on `md`/`lg`; `sm` is only
 * used inside rows that already provide 44px of vertical padding.
 * Keyboard: renders a real <button>/<a>, so Enter/Space activation is native.
 */
const base =
  'relative inline-flex items-center justify-center gap-s3 rounded-full font-semibold ' +
  'transition-[background-color,color,box-shadow,transform,border-color] ' +
  'duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] active:translate-y-px ' +
  'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50'

const sizes = {
  sm: 'min-h-10 px-s6 text-sm',
  md: 'min-h-11 px-s7 text-md',
  lg: 'min-h-14 px-8 text-lg',
}

const variants = {
  primary:
    'bg-action-primary text-white shadow-glow hover:bg-action-primary-hover ' +
    'active:bg-action-primary-active',
  // `secondary` is the on-accent button: white on the purple CTA band.
  secondary:
    'bg-white text-action-primary-active shadow-2 hover:bg-surface-raised active:bg-surface-strong',
  outline:
    'border border-border-strong bg-surface-base text-text-primary hover:border-text-primary ' +
    'hover:bg-surface-raised active:bg-surface-strong',
  ghost: 'bg-transparent text-text-primary hover:bg-surface-raised active:bg-surface-strong',
  danger: 'bg-[#ffe3e3] text-[#8a1111] hover:bg-[#ffd0d0] active:bg-[#ffbcbc]',
}

export default function Button({
  as,
  variant = 'primary',
  size = 'md',
  loading = false,
  error = false,
  icon,
  // Labels stay on one line by default. `wrap` lets a long label break rather
  // than overflow its own padding — a passed `whitespace-normal` class cannot
  // do this, because the base utility wins on CSS source order.
  wrap = false,
  className = '',
  children,
  ...rest
}) {
  const Tag = as ?? (rest.href ? 'a' : 'button')
  const isNative = Tag === 'button'
  const tone = error ? 'danger' : variant

  return (
    <Tag
      {...(isNative ? { type: rest.type ?? 'button' } : {})}
      {...rest}
      aria-busy={loading || undefined}
      aria-disabled={!isNative && (loading || rest.disabled) ? true : undefined}
      disabled={isNative ? rest.disabled || loading : undefined}
      className={cx(base, wrap ? 'whitespace-normal' : 'whitespace-nowrap', sizes[size], variants[tone], className)}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      <span className={cx(loading && 'opacity-80')}>{children}</span>
      {icon && !loading && <Icon name={icon} size={16} className="shrink-0" />}
      {loading && <span className="sr-only">Loading</span>}
    </Tag>
  )
}

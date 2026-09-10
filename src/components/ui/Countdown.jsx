import { useEffect, useState } from 'react'
import cx from '@/lib/cx'

/**
 * Campaign countdown.
 *
 * `endsAt` is an ISO timestamp with an explicit UTC offset — the same instant
 * for every visitor, wherever they are — and is the honest way to run this:
 * a clock that restarts on reload is a dark pattern, not urgency. `hours`
 * stays as a fallback for a per-visitor window, and is also what is used if
 * `endsAt` fails to parse rather than showing a broken timer.
 *
 * Every unit box is the same width. The row is a grid whose columns are all
 * `1fr`, so they resolve to the widest box instead of each hugging its own
 * caption — "SECONDS" is twice as wide as "DAYS", and boxes that followed
 * their captions came out visibly uneven. Captions abbreviate wherever the
 * full words would not fit, for the same reason.
 *
 * Accessibility: the ticking digits are `aria-hidden`, because a per-second
 * live region is unusable with a screen reader. The visually hidden sentence
 * beside them states the same thing once, in whole days, hours and minutes.
 */
const pad = (n) => String(n).padStart(2, '0')

function remainingFrom(deadline) {
  const ms = Math.max(0, deadline - Date.now())
  const total = Math.floor(ms / 1000)
  return {
    expired: ms === 0,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

function resolveDeadline(endsAt, hours) {
  const parsed = endsAt ? Date.parse(endsAt) : NaN
  return Number.isNaN(parsed) ? Date.now() + hours * 3600 * 1000 : parsed
}

function sentence(left) {
  if (left.expired) return 'This offer has ended.'
  const parts = []
  if (left.days) parts.push(`${left.days} days`)
  parts.push(`${left.hours} hours`, `${left.minutes} minutes`)
  return `Offer ends in about ${parts.join(', ')}.`
}

/**
 * `md` is the banner size: a centred row sized to its widest box, with colons
 * sitting in the gaps. `sm` is for cards: the row fills the card's width in
 * equal columns and drops the colons, which are noise at that size.
 */
const sizes = {
  md: {
    row: 'inline-grid auto-cols-fr grid-flow-col gap-s5 sm:gap-s6',
    box: 'px-s4 py-s4 sm:px-s6',
    digits: 'text-d3 sm:text-d2',
    caption: 'text-xs',
    // Full words only where there is room for four of them.
    fullCaptionFrom: 'sm',
    separators: true,
  },
  sm: {
    row: 'grid w-full auto-cols-[minmax(0,1fr)] grid-flow-col gap-s2',
    box: 'px-s2 py-s3',
    digits: 'text-d3',
    caption: 'text-[10px]',
    fullCaptionFrom: null,
    separators: false,
  },
}

export default function Countdown({
  endsAt,
  hours = 48,
  label,
  onAccent = false,
  compact = false,
  size = 'md',
  onExpire,
}) {
  // The clock is read in an effect, never during render: `Date.now()` in the
  // render pass is impure and would drift between renders.
  const [left, setLeft] = useState(null)

  useEffect(() => {
    const deadline = resolveDeadline(endsAt, hours)
    const tick = () => {
      const next = remainingFrom(deadline)
      setLeft(next)
      if (next.expired) clearInterval(id)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [endsAt, hours])

  useEffect(() => {
    if (left?.expired) onExpire?.()
  }, [left?.expired, onExpire])

  // Nothing to show until the first tick — rendering a placeholder clock would
  // flash a wrong number on every load.
  if (!left) return null

  const units = [
    left.days > 0 && { value: pad(left.days), label: 'days', abbr: 'days', short: 'd' },
    { value: pad(left.hours), label: 'hours', abbr: 'hrs', short: 'h' },
    { value: pad(left.minutes), label: 'minutes', abbr: 'min', short: 'm' },
    { value: pad(left.seconds), label: 'seconds', abbr: 'sec', short: 's' },
  ].filter(Boolean)

  if (compact) {
    return (
      <span role="timer" className="inline-flex items-baseline gap-s2">
        <span className="sr-only">{sentence(left)}</span>
        <span aria-hidden="true" className="font-semibold tabular-nums">
          {units.map((u) => `${u.value}${u.short}`).join(' ')}
        </span>
      </span>
    )
  }

  const scale = sizes[size] ?? sizes.md
  const box = onAccent
    ? 'border-white/35 bg-white/15 text-white'
    : 'border-border-default bg-surface-base text-text-primary'
  const captionTone = onAccent ? 'text-white' : 'text-text-muted'

  return (
    <div role="timer" className="flex w-full flex-col items-center gap-s5">
      {label && (
        <p
          className={cx(
            'text-xs font-semibold uppercase tracking-[0.14em]',
            onAccent ? 'text-white' : 'text-action-primary-active',
          )}
        >
          {label}
        </p>
      )}

      <p className="sr-only">{sentence(left)}</p>

      <div aria-hidden="true" className={scale.row}>
        {units.map((unit, i) => (
          <span key={unit.label} className="relative flex">
            <span
              className={cx(
                'flex w-full flex-col items-center rounded-md border',
                scale.box,
                box,
              )}
            >
              <span className={cx('font-bold leading-none tabular-nums', scale.digits)}>
                {unit.value}
              </span>
              <span
                className={cx(
                  'mt-s2 font-medium uppercase tracking-[0.12em]',
                  scale.caption,
                  captionTone,
                )}
              >
                {scale.fullCaptionFrom ? (
                  <>
                    <span className="sm:hidden">{unit.abbr}</span>
                    <span className="max-sm:hidden">{unit.label}</span>
                  </>
                ) : (
                  unit.abbr
                )}
              </span>
            </span>

            {/* The colon lives in the gap, absolutely positioned, so it never
                takes a grid column and never skews the equal widths. */}
            {scale.separators && i < units.length - 1 && (
              <span
                className={cx(
                  'absolute left-full top-1/2 w-s5 -translate-y-1/2 text-center text-d3 font-bold leading-none sm:w-s6',
                  captionTone,
                )}
              >
                :
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

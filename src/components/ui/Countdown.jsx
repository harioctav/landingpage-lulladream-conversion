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
 * `sm` is for the hero card, where four unit boxes at the banner size overflow
 * a 24rem card. It drops the colons as well as tightening the box: at this
 * size the separators are noise rather than structure.
 */
const sizes = {
  md: {
    box: 'min-w-[3.75rem] px-s4 py-s4 sm:min-w-[4.5rem] sm:px-s5',
    digits: 'text-d3 sm:text-d2',
    caption: 'text-xs',
    gap: 'gap-s3 sm:gap-s4',
    separators: true,
  },
  sm: {
    box: 'min-w-[3.25rem] px-s3 py-s3',
    digits: 'text-d3',
    caption: 'text-[10px]',
    gap: 'gap-s2',
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
    left.days > 0 && { value: pad(left.days), label: 'days', short: 'd' },
    { value: pad(left.hours), label: 'hours', short: 'h' },
    { value: pad(left.minutes), label: 'minutes', short: 'm' },
    { value: pad(left.seconds), label: 'seconds', short: 's' },
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
    <div role="timer" className="flex flex-col items-center gap-s5">
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

      <div aria-hidden="true" className={cx('flex items-center', scale.gap)}>
        {units.map((unit, i) => (
          <span key={unit.label} className={cx('flex items-center', scale.gap)}>
            <span className={cx('flex flex-col items-center rounded-md border', scale.box, box)}>
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
                {unit.label}
              </span>
            </span>
            {scale.separators && i < units.length - 1 && (
              <span className={cx('text-d3 font-bold leading-none', captionTone)}>:</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

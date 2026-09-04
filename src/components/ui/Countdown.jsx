import { useEffect, useState } from 'react'

/**
 * Trial-expiry countdown.
 *
 * The deadline is fixed once on mount from `hours` — swap this for the real
 * `trialEndsAt` timestamp from the account when the page is wired to the app;
 * a countdown that resets on every reload is a dark pattern, not urgency.
 *
 * Accessibility: the ticking digits are `aria-hidden`, because a per-second
 * live region is unusable with a screen reader. The visually hidden sentence
 * beside them states the same thing once, in whole hours, and is only
 * re-announced when that number changes.
 */
const pad = (n) => String(n).padStart(2, '0')

function remainingFrom(deadline) {
  const ms = Math.max(0, deadline - Date.now())
  const total = Math.floor(ms / 1000)
  return {
    expired: ms === 0,
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

export default function Countdown({ hours = 48, label, onAccent = false }) {
  // The clock is read in an effect, never during render: `Date.now()` in the
  // render pass is impure and would drift between renders. Until the effect
  // runs, the display shows the full interval rather than an empty box.
  const [left, setLeft] = useState({ expired: false, hours, minutes: 0, seconds: 0 })

  useEffect(() => {
    const deadline = Date.now() + hours * 3600 * 1000
    const tick = () => {
      const next = remainingFrom(deadline)
      setLeft(next)
      if (next.expired) clearInterval(id)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [hours])

  const units = [
    { value: pad(left.hours), label: 'hours' },
    { value: pad(left.minutes), label: 'minutes' },
    { value: pad(left.seconds), label: 'seconds' },
  ]

  const box = onAccent
    ? 'border-white/35 bg-white/15 text-white'
    : 'border-border-default bg-surface-base text-text-primary'
  const captionTone = onAccent ? 'text-white' : 'text-text-muted'

  return (
    <div role="timer" className="flex flex-col items-center gap-s5">
      {label && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.14em] ${onAccent ? 'text-white' : 'text-action-primary-active'}`}
        >
          {label}
        </p>
      )}

      <p className="sr-only">
        {left.expired
          ? 'Your free stories have ended.'
          : `Your free stories end in about ${left.hours} hours and ${left.minutes} minutes.`}
      </p>

      <div aria-hidden="true" className="flex items-center gap-s4">
        {units.map((unit, i) => (
          <span key={unit.label} className="flex items-center gap-s4">
            <span
              className={`flex min-w-[4.5rem] flex-col items-center rounded-md border px-s5 py-s4 ${box}`}
            >
              <span className="text-d3 font-bold tabular-nums leading-none sm:text-d2">
                {unit.value}
              </span>
              <span className={`mt-s2 text-xs font-medium uppercase tracking-[0.12em] ${captionTone}`}>
                {unit.label}
              </span>
            </span>
            {i < units.length - 1 && (
              <span className={`text-d3 font-bold leading-none ${captionTone}`}>:</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

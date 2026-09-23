import { checkout } from '@/data/checkout'
import cx from '@/lib/cx'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import Logo from '@/components/ui/Logo'

/**
 * Success, pending and failed share this page; which one is baked into each
 * HTML file as `data-status`, so a payment provider can redirect straight to
 * a static URL.
 *
 * Success is the brand purple rather than the usual green — this palette has
 * no green, and inventing one for a single page would break the token
 * contract. The icon and the heading carry the meaning, not the hue alone.
 */
const tones = {
  success: 'bg-action-primary text-white',
  pending: 'bg-sun-300 text-ink-900',
  failed: 'bg-badge-discount text-white',
}

function params() {
  return new URLSearchParams(window.location.search)
}

export default function CheckoutStatus({ status = 'pending' }) {
  const data = checkout.statuses[status] ?? checkout.statuses.pending
  const query = params()

  const reference = query.get('ref')
  const reasonKey = query.get('reason')
  const reason = data.reasons?.[reasonKey]
  // Retry should land back on the plan the visitor was buying.
  const planId = query.get('plan')
  const ctaHref =
    status === 'failed' && planId
      ? `${data.cta.href}?plan=${encodeURIComponent(planId)}`
      : data.cta.href
  const detail = status === 'failed' ? reason : reference

  return (
    <div className="flex min-h-svh flex-col bg-surface-raised">
      <div className="mx-auto flex w-full max-w-lg grow flex-col justify-center px-s6 py-12 sm:px-8">
        <a
          href="../../"
          aria-label="LullaDream — back to the site"
          className="mb-s7 flex justify-center rounded-sm"
        >
          <Logo className="h-11 self-center sm:h-12" />
        </a>

        <main className="flex flex-col items-center gap-s6 rounded-xl border border-border-default bg-surface-base px-s7 py-10 text-center shadow-3 max-sm:px-s5">
          <span
            aria-hidden="true"
            className={cx(
              'flex size-16 items-center justify-center rounded-full',
              tones[status] ?? tones.pending,
            )}
          >
            <Icon name={data.icon} size={32} strokeWidth={2} />
          </span>

          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-action-primary-active">
            {data.eyebrow}
          </p>

          <h1 className="text-balance text-d3 text-text-primary sm:text-d2">{data.title}</h1>

          <p className="text-pretty text-md text-text-muted lg:text-lg">{data.body}</p>

          {detail && (
            <p className="flex flex-col items-center gap-s2 rounded-md border border-border-default bg-surface-raised px-s6 py-s5">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                {data.refLabel}
              </span>
              <span
                className={cx(
                  'text-md font-semibold text-text-primary',
                  status !== 'failed' && 'tracking-[0.08em] tabular-nums',
                )}
              >
                {detail}
              </span>
            </p>
          )}

          <Button
            href={ctaHref}
            size="lg"
            icon="arrowRight"
            wrap
            className="mt-s2 w-full text-center max-sm:px-s5 max-sm:text-md"
          >
            {data.cta.label}
          </Button>

          <a
            href={data.secondary.href}
            className="rounded-xs text-md font-semibold text-action-primary-active underline underline-offset-4 transition-colors duration-150 hover:text-action-primary-hover"
          >
            {data.secondary.label}
          </a>

          <p className="text-sm text-text-muted">{data.note}</p>
        </main>
      </div>
    </div>
  )
}

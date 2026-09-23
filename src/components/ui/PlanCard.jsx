import cx from '@/lib/cx'
import Button from './Button'
import Icon from './Icon'

/**
 * The plan card from the pricing section.
 *
 * Shared, so the checkout shows the chosen plan exactly as it looked when it
 * was chosen — same badge, price, features and framing — instead of a second,
 * subtly different summary of the same thing.
 *
 * `cta={false}` drops the button for the checkout, where the form's own
 * submit is the action.
 */
export default function PlanCard({
  plan,
  as: Tag = 'li',
  cta = true,
  headingLevel: Heading = 'h3',
  className = '',
}) {
  const featured = plan.featured

  return (
    <Tag
      className={cx(
        'relative flex flex-col rounded-lg border bg-surface-base p-s8',
        featured ? 'border-2 border-action-primary shadow-3' : 'border-border-default shadow-1',
        className,
      )}
    >
      {plan.badge && (
        <span className="absolute -top-3 right-s8 inline-flex items-center gap-s2 rounded-full bg-sun-300 px-s5 py-s1 text-xs font-bold uppercase tracking-[0.1em] text-ink-900 shadow-2">
          {plan.badge}
        </span>
      )}

      <div className="flex flex-wrap items-center gap-s4">
        <span className="inline-flex items-center gap-s2 rounded-full bg-badge-discount px-s4 py-s2 text-xs font-bold uppercase tracking-[0.1em] text-white">
          <Icon name="flame" size={13} />
          {plan.discount}
        </span>
        <Heading className="text-d3 text-action-primary-active">{plan.name}</Heading>
      </div>

      {plan.trial && <p className="mt-s5 text-md font-bold text-text-primary">{plan.trial}</p>}

      {/* The price and its period are one unit — letting "/ month" wrap onto
          its own line reads as a separate fact. */}
      <p className={cx('flex flex-wrap items-baseline gap-s4', plan.trial ? 'mt-s3' : 'mt-s5')}>
        <s className="text-lg font-medium text-text-muted">{plan.was}</s>
        <span className="flex items-baseline gap-s3">
          <span className="text-[40px] font-bold leading-none tracking-[-0.03em] text-text-primary">
            {plan.price}
          </span>
          {plan.unit && (
            <span className="whitespace-nowrap text-md text-text-muted">{plan.unit}</span>
          )}
        </span>
      </p>

      {plan.then && (
        <p className="mt-s4 text-md font-semibold italic text-text-primary">{plan.then}</p>
      )}

      <p className="mt-s5 text-pretty text-md text-text-muted">{plan.summary}</p>

      <ul className="mt-s7 flex grow flex-col gap-s5 border-t border-border-default pt-s7">
        {plan.features.map((feature) => (
          <li key={feature.strong + feature.text} className="flex items-start gap-s4 text-md">
            {feature.pill ? (
              <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full bg-action-primary px-s4 py-s1 text-xs font-bold text-white">
                {feature.pill}
              </span>
            ) : (
              <span
                aria-hidden="true"
                className={cx(
                  'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full',
                  featured
                    ? 'bg-action-primary text-white'
                    : 'bg-surface-strong text-action-primary-active',
                )}
              >
                <Icon name="check" size={14} strokeWidth={2.2} />
              </span>
            )}
            <span className="text-pretty text-text-primary">
              <strong className="font-bold">{feature.strong}</strong> {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {cta && (
        <Button
          href={plan.cta.href}
          size="lg"
          variant={featured ? 'primary' : 'outline'}
          icon="arrowRight"
          wrap
          className="mt-s8 w-full text-center"
        >
          {plan.cta.label}
        </Button>
      )}

      {/* Risk reducer sits with the price, not three sections away. */}
      <p className="mt-s5 flex items-start gap-s3 text-sm text-text-muted">
        <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-action-primary-active" />
        {plan.note}
      </p>
    </Tag>
  )
}

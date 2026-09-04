import { pricing } from '@/data/content'
import cx from '@/lib/cx'
import Button from '@/components/ui/Button'
import Decor from '@/components/ui/Decor'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'
import Section, { SectionHeading } from '@/components/ui/Section'

/**
 * The one testimonial that carries a result rather than a feeling. It sits
 * directly above the plans on purpose: the last thing read before a price
 * should be another parent saying it worked.
 */
function FeaturedQuote() {
  const q = pricing.featuredQuote

  return (
    <figure className="mx-auto flex max-w-2xl flex-col items-center gap-s6 rounded-lg border border-border-default bg-surface-base p-s8 text-center shadow-2">
      <span className="flex items-center gap-s1 text-action-primary-active" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Icon key={i} name="star" size={18} className="fill-current" strokeWidth={0} />
        ))}
      </span>

      <blockquote className="text-pretty text-lg text-text-primary">“{q.quote}”</blockquote>

      <figcaption className="flex items-center gap-s4">
        <img
          src={q.avatar}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="80"
          height="80"
          className="size-11 shrink-0 rounded-full object-cover"
        />
        <span className="flex flex-col text-left">
          <span className="text-md font-semibold text-text-primary">{q.name}</span>
          <span className="text-sm text-text-muted">{q.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

function Plan({ plan }) {
  const featured = plan.variant === 'primary'

  return (
    <li
      className={cx(
        'relative flex flex-col rounded-lg border bg-surface-base p-s8',
        featured
          ? 'border-2 border-action-primary shadow-3 lg:-mt-s6 lg:mb-[-1.5rem]'
          : 'border-border-default shadow-1',
      )}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-s8 inline-flex items-center gap-s2 rounded-full bg-action-primary px-s5 py-s1 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-2">
          <Icon name="sparkle" size={13} />
          {plan.badge}
        </span>
      )}

      <div className="flex items-center justify-between gap-s4">
        <h3 className="text-d3 text-text-primary">{plan.name}</h3>
        {plan.save && (
          <span className="rounded-full bg-sun-300 px-s4 py-s1 text-xs font-bold uppercase tracking-[0.1em] text-ink-900">
            {plan.save}
          </span>
        )}
      </div>

      <p className="mt-s5 flex items-baseline gap-s3">
        <span className="text-[40px] font-bold leading-none tracking-[-0.03em] text-text-primary">
          {plan.price}
        </span>
        <span className="text-md text-text-muted">{plan.unit}</span>
      </p>

      {plan.billed && <p className="mt-s3 text-sm text-text-muted">{plan.billed}</p>}

      <p className="mt-s5 text-pretty text-md text-text-muted">{plan.summary}</p>

      <ul className="mt-s7 flex grow flex-col gap-s5 border-t border-border-default pt-s7">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-s4 text-md text-text-primary">
            <span
              aria-hidden="true"
              className={cx(
                'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full',
                featured ? 'bg-action-primary text-white' : 'bg-surface-strong text-action-primary-active',
              )}
            >
              <Icon name="check" size={14} strokeWidth={2.2} />
            </span>
            <span className="text-pretty">{feature}</span>
          </li>
        ))}
      </ul>

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

      {/* Risk reducer sits with the price, not three sections away. */}
      <p className="mt-s5 flex items-start gap-s3 text-sm text-text-muted">
        <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-action-primary-active" />
        {plan.note}
      </p>
    </li>
  )
}

export default function Pricing() {
  return (
    <Section id="pricing" aria-labelledby="pricing-title" className="overflow-hidden bg-surface-raised">
      <Decor name="shapeBlobPetal" tint={false} className="right-[-3%] top-[10%] w-36 opacity-50" float />
      <Decor name="shapeSwoosh" tint={false} className="left-[4%] bottom-[12%] w-14 opacity-70" />

      <Reveal className="mb-12">
        <FeaturedQuote />
      </Reveal>

      <Reveal delay={80}>
        <SectionHeading
          id="pricing-title"
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          body={pricing.body}
          className="mb-12 lg:mb-16"
        />
      </Reveal>

      <Reveal
        as="ul"
        delay={140}
        className="mx-auto grid max-w-3xl items-stretch gap-s7 lg:grid-cols-2 lg:gap-8"
      >
        {pricing.plans.map((plan) => (
          <Plan key={plan.id} plan={plan} />
        ))}
      </Reveal>

      <Reveal delay={200} className="mt-12 flex flex-col items-center gap-s5 text-center">
        <p className="max-w-xl text-pretty text-md font-semibold text-text-primary lg:text-lg">
          {pricing.anchor}
        </p>
        <p className="text-sm text-text-muted">{pricing.reassurance}</p>
      </Reveal>
    </Section>
  )
}

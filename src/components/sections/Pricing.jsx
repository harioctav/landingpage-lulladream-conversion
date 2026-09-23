import { useState } from 'react'
import { pricing } from '@/data/content'
import cx from '@/lib/cx'
import PlanCard from '@/components/ui/PlanCard'
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

/**
 * Monthly / Yearly switch.
 *
 * Two toggle buttons in a labelled group rather than a custom slider: each is
 * a real tab stop with native Enter/Space, and `aria-pressed` announces which
 * period is showing. The moving pill is a sibling that translates, so the
 * labels never re-flow as it slides.
 */
function CycleSwitch({ cycle, onChange }) {
  return (
    <div
      role="group"
      aria-label={pricing.cycleLabel}
      className="relative mx-auto grid w-full max-w-sm grid-cols-2 rounded-full bg-surface-strong p-s1"
    >
      <span
        aria-hidden="true"
        className={cx(
          'pointer-events-none absolute inset-y-s1 left-s1 w-[calc(50%-2px)] rounded-full bg-action-primary shadow-2',
          'transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
          cycle === 'yearly' && 'translate-x-full',
        )}
      />

      {pricing.cycles.map((item) => {
        const active = item.id === cycle
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(item.id)}
            className={cx(
              'relative z-10 min-h-11 rounded-full px-s6 text-md font-semibold transition-colors duration-200',
              active ? 'text-white' : 'text-text-primary hover:text-action-primary-active',
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export default function Pricing() {
  const [cycle, setCycle] = useState('monthly')
  const plans = pricing.plans[cycle]

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
          className="mb-10"
        />
      </Reveal>

      <Reveal delay={120} className="mb-12">
        <CycleSwitch cycle={cycle} onChange={setCycle} />
      </Reveal>

      {/* Keyed on the cycle so the cards remount and re-run their reveal —
          the swap should read as new pricing arriving, not text mutating. */}
      <Reveal
        key={cycle}
        as="ul"
        delay={60}
        className="mx-auto grid max-w-3xl items-stretch gap-s8 lg:grid-cols-2 lg:gap-8"
      >
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
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

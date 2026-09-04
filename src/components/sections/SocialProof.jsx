import { proof } from '@/data/content'
import cx from '@/lib/cx'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'

function Rating() {
  const { score, outOf, count } = proof.rating
  return (
    <p className="flex flex-wrap items-center justify-center gap-s4 text-text-primary">
      <span className="flex items-center gap-s1 text-action-primary-active" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Icon key={i} name="star" size={20} className="fill-current" strokeWidth={0} />
        ))}
      </span>
      <span className="text-lg font-semibold">
        {score}/{outOf}
      </span>
      <span className="text-md text-text-muted">from {count} parents</span>
    </p>
  )
}

function Quote({ item, clone = false }) {
  return (
    <li
      aria-hidden={clone || undefined}
      // The gap lives on the item, not the track: each half of the marquee
      // then measures exactly 50% of the track and the loop has no seam.
      className="mr-s6 w-[min(82vw,340px)] shrink-0"
    >
      <figure className="flex h-full flex-col gap-s6 rounded-lg border border-border-default bg-surface-raised p-s7">
        <blockquote className="grow text-pretty text-md text-text-primary">
          “{item.quote}”
        </blockquote>
        <figcaption className="flex items-center gap-s4 border-t border-border-default pt-s6">
          <img
            src={item.avatar}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width="80"
            height="80"
            className="size-11 shrink-0 rounded-full object-cover"
          />
          <span className="flex min-w-0 flex-col">
            <span className="text-md font-semibold text-text-primary">{item.name}</span>
            <span className="text-sm text-text-muted">{item.role}</span>
          </span>
        </figcaption>
      </figure>
    </li>
  )
}

export default function SocialProof() {
  return (
    <Section aria-labelledby="proof-title" className="overflow-hidden bg-surface-base">
      <Reveal className="mb-12 flex flex-col items-center gap-s6 text-center lg:mb-16">
        <Rating />
        <h2
          id="proof-title"
          className="max-w-2xl text-balance text-d3 text-text-primary sm:text-d2 lg:text-d1"
        >
          {proof.title}
        </h2>
      </Reveal>

      {/*
        Continuous strip. The quotes render twice — the second set is
        `aria-hidden`, so assistive tech reads each review once.

        Motion stops on hover and whenever focus lands inside the strip, and
        `prefers-reduced-motion` freezes it outright. Note that WCAG 2.2
        SC 2.2.2 asks for an explicit pause mechanism for content that
        auto-scrolls beyond five seconds — see the README.
      */}
      <div
        className="group relative -mx-s6 overflow-hidden sm:-mx-8 lg:-mx-gutter"
        tabIndex={0}
        aria-label="Parent reviews, auto-scrolling"
      >
        <ul
          aria-label="Parent reviews"
          className={cx(
            'animate-marquee flex w-max',
            'group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]',
          )}
        >
          {proof.quotes.map((item) => (
            <Quote key={item.name} item={item} />
          ))}
          {proof.quotes.map((item) => (
            <Quote key={`clone-${item.name}`} item={item} clone />
          ))}
        </ul>

        {/* Edge fades hint that the strip continues past the viewport. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-surface-base to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-surface-base to-transparent"
        />
      </div>

      {/* Checkout trust badges — the objections that surface at the payment step. */}
      <Reveal
        as="ul"
        delay={120}
        className="mt-14 grid gap-s6 sm:grid-cols-3 lg:mt-16"
      >
        {proof.badges.map((badge) => (
          <li
            key={badge.label}
            className="flex items-center gap-s5 rounded-lg border border-border-default bg-surface-raised px-s7 py-s6"
          >
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-base text-action-primary shadow-1"
            >
              <Icon name={badge.icon} size={21} />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-md font-semibold text-text-primary">{badge.label}</span>
              <span className="text-sm text-text-muted">{badge.note}</span>
            </span>
          </li>
        ))}
      </Reveal>
    </Section>
  )
}

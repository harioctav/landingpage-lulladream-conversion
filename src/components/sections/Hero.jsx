import { hero, promo } from '@/data/content'
import Button from '@/components/ui/Button'
import Countdown from '@/components/ui/Countdown'
import Decor from '@/components/ui/Decor'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'
import { Container } from '@/components/ui/Section'

/**
 * The campaign offer, above the fold and on the clock.
 *
 * It reads the same `promo.endsAt` as the top bar and the closing banner, so
 * the three countdowns on this page cannot disagree with each other.
 */
function OfferCard() {
  return (
    <div className="w-full max-w-sm rounded-lg border border-border-default bg-surface-base p-s7 shadow-3">
      <p className="flex items-center gap-s3 text-xs font-semibold uppercase tracking-[0.14em] text-action-primary-active">
        <Icon name="flame" size={15} />
        Campaign offer
      </p>

      <p className="mt-s4 flex flex-wrap items-baseline gap-s3">
        <span className="text-d3 font-bold text-text-primary">{promo.badge}</span>
        <span className="text-lg font-semibold text-text-primary">{promo.plan}</span>
      </p>

      {/* The clock sits on the raised surface so the white unit boxes read as
          raised out of the card rather than dissolving into it. */}
      <div className="mt-s6 rounded-md bg-surface-raised px-s5 py-s6">
        <Countdown endsAt={promo.endsAt} label={promo.note} size="sm" />
      </div>

      <p className="mt-s5 text-sm text-text-muted">
        7 days free, then USD 3.99 / month. Cancel any time.
      </p>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex items-center overflow-hidden bg-linear-to-b from-surface-raised to-surface-base py-16 lg:py-20"
    >
      {/* Soft brand wash behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-200px] -z-10 size-[620px] -translate-x-1/2 rounded-full bg-dream-500/12 blur-[130px]"
      />

      <Decor name="shapeCloud" tint={false} className="left-[-3%] top-[18%] w-48 opacity-70" float />
      <Decor name="shapeCloudLarge" tint={false} className="right-[-2%] top-[46%] w-44 opacity-60" float />
      <Decor name="shapeSparkle" tint={false} className="left-[7%] top-[66%] w-14 opacity-80" />
      <Decor name="shapeSparkleAlt" tint={false} className="right-[3%] top-[8%] w-16 opacity-70" />

      <Container className="relative w-full">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          {/* Copy — revealed on load, staggered top to bottom. */}
          <div className="flex flex-col items-start gap-s7">
            <Reveal
              immediate
              as="p"
              className="inline-flex items-center gap-s3 rounded-full border border-dream-100 bg-surface-base px-s5 py-s3 text-xs font-semibold uppercase tracking-[0.14em] text-action-primary-active"
            >
              <Icon name="instagram" size={15} />
              {hero.eyebrow}
            </Reveal>

            <Reveal
              immediate
              delay={90}
              as="h1"
              className="text-balance text-d2 text-text-primary sm:text-[44px] sm:leading-[1.1] lg:text-[50px] lg:leading-[1.08] lg:tracking-[-0.035em]"
            >
              {hero.title.map((line) => (
                <span key={line} className="block max-lg:inline">
                  {line}{' '}
                </span>
              ))}
            </Reveal>

            <Reveal immediate delay={180} as="p" className="max-w-xl text-pretty text-lg text-text-muted lg:text-xl">
              {hero.body}
            </Reveal>

            {/* Illustrative, not interactive: the animals from the Instagram
                carousel, shown so the promise is concrete. Nothing to fill in
                here — the story itself is built after the CTA. */}
            <Reveal immediate delay={240} className="flex flex-col gap-s4">
              <p className="text-sm font-semibold text-text-primary">{hero.animalsLabel}</p>
              <ul className="flex flex-wrap items-center gap-s3">
                {hero.animals.map((animal) => (
                  <li
                    key={animal.name}
                    className="inline-flex items-center gap-s3 rounded-full border border-border-default bg-surface-base px-s5 py-s3 text-md font-semibold text-text-primary"
                  >
                    <span aria-hidden="true" className="text-lg leading-none">
                      {animal.emoji}
                    </span>
                    {animal.name}
                  </li>
                ))}
                <li className="text-sm text-text-muted">{hero.animalsMore}</li>
              </ul>
            </Reveal>

            {/* One CTA only, and it goes straight to the story builder. */}
            <Reveal immediate delay={300} className="w-full sm:w-auto">
              <Button href={hero.cta.href} size="lg" icon="arrowRight" wrap className="w-full text-center sm:w-auto">
                {hero.cta.label}
              </Button>
            </Reveal>

            <Reveal immediate delay={350} as="p" className="text-sm text-text-muted">
              {hero.reassurance}
            </Reveal>

            <Reveal
              immediate
              delay={400}
              as="ul"
              className="mt-s2 flex flex-wrap items-center gap-x-8 gap-y-s6 border-t border-border-default pt-s7"
            >
              {hero.stats.map((stat) => (
                <li key={stat.label} className="flex flex-col">
                  <span className="text-xl font-bold text-text-primary">{stat.value}</span>
                  <span className="text-sm text-text-muted">{stat.label}</span>
                </li>
              ))}
            </Reveal>
          </div>

          {/* Story art, with the offer clock anchored to it. */}
          <Reveal immediate delay={220} as="figure" className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-dream-500/16 blur-[90px]"
            />
            {/* A plain rounded rectangle — the artwork is the subject, so no
                silhouette competes with it. The slow rise and fall is the only
                movement, and the base layer stills it under reduced motion. */}
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              width="384"
              height="384"
              decoding="async"
              fetchPriority="high"
              className="animate-float aspect-[4/3] w-full rounded-xl object-cover object-top shadow-3"
            />

            {/* Overlaps the image. `relative z-10` is load-bearing:
                `animate-float` sets `will-change: transform`, which makes the
                image its own stacking context, and an in-flow card pulled
                under it by the negative margin would be painted behind it. */}
            <figcaption className="relative z-10 -mt-10 flex justify-center lg:justify-start lg:pl-s7">
              <OfferCard />
            </figcaption>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

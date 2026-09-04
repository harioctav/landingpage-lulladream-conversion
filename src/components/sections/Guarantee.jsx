import { guarantee } from '@/data/content'
import Decor from '@/components/ui/Decor'
import Icon from '@/components/ui/Icon'
import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import { Container } from '@/components/ui/Section'

export default function Guarantee() {
  return (
    <section
      id="guarantee"
      aria-labelledby="guarantee-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-surface-raised py-20 sm:py-24 lg:py-section"
    >
      <Decor name="shapeCloud" tint={false} className="right-[-4%] top-[10%] w-44 opacity-60" float />
      <Decor name="shapeBunny" tint={false} className="left-[2%] bottom-[10%] w-16 opacity-60" />

      <Container className="relative">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal className="flex flex-col gap-s7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-action-primary-active">
              {guarantee.eyebrow}
            </p>
            <h2
              id="guarantee-title"
              className="text-balance text-d3 text-text-primary sm:text-d2 lg:text-d1"
            >
              {guarantee.title}
            </h2>
            <p className="max-w-xl text-pretty text-md text-text-muted lg:text-lg">
              {guarantee.body}
            </p>

            <figure className="relative mt-s5 hidden lg:block">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-dream-500/14 blur-[70px]"
              />
              <Photo image={guarantee.image} shape="blob-cloud" className="aspect-[4/3] w-full max-w-sm" />
            </figure>
          </Reveal>

          <ul className="grid gap-s6 sm:grid-cols-2">
            {guarantee.points.map((point, i) => (
              <Reveal
                as="li"
                key={point.title}
                delay={i * 100}
                className="flex flex-col gap-s5 rounded-lg border border-border-default bg-surface-base p-s7 shadow-1"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-full bg-surface-raised text-action-primary"
                >
                  <Icon name={point.icon} size={24} />
                </span>
                <h3 className="text-lg font-semibold text-text-primary">{point.title}</h3>
                <p className="text-pretty text-md text-text-muted">{point.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

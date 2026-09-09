import { finalCta, promo } from '@/data/content'
import Button from '@/components/ui/Button'
import Countdown from '@/components/ui/Countdown'
import Decor from '@/components/ui/Decor'
import Starfield from '@/components/ui/Starfield'
import Reveal from '@/components/ui/Reveal'
import { Container } from '@/components/ui/Section'

export default function FinalCta() {
  return (
    <section id="get-started" className="scroll-mt-24 pb-20 pt-8 sm:pb-24 sm:pt-12 lg:pb-section lg:pt-20">
      <Container>
        <Reveal className="on-accent relative isolate overflow-hidden rounded-xl bg-linear-to-br from-dream-600 via-dream-500 to-dream-700 px-s7 py-16 text-center sm:px-10 lg:px-16 lg:py-24">
          <Starfield />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-[110px]"
          />
          <Decor name="shapeBlobBud" className="left-[5%] top-[18%] w-20 opacity-20" float />
          <Decor name="shapePaperPlane" className="right-[7%] top-[20%] w-16 opacity-30" />

          <div className="relative flex flex-col items-center gap-s7 px-s5 sm:px-0">
            <p className="inline-flex items-center rounded-full border border-white/40 px-s5 py-s2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
              {finalCta.eyebrow}
            </p>

            <h2 className="max-w-2xl text-balance text-d3 text-white sm:text-d2 lg:text-d1">
              {finalCta.title}
            </h2>

            <Countdown endsAt={promo.endsAt} label={finalCta.countdownLabel} onAccent />

            <p className="max-w-xl text-pretty text-md text-white lg:text-lg">{finalCta.body}</p>

            {/* The label nearly fills the card on phones. Capping the width
                forces it to wrap onto two lines, which keeps the button's own
                horizontal padding intact instead of letting the text run into
                the pill edges. */}
            <Button
              href={finalCta.cta.href}
              size="lg"
              variant="secondary"
              icon="arrowRight"
              wrap
              className="max-w-[17rem] py-s4 text-center sm:max-w-none"
            >
              {finalCta.cta.label}
            </Button>

            <p className="text-sm text-white">{finalCta.secondary}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

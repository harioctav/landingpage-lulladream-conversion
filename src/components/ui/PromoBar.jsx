import { promo } from '@/data/content'
import Countdown from './Countdown'
import Icon from './Icon'
import { Container } from './Section'

/**
 * Campaign announcement bar. Sits above the sticky navbar and scrolls away
 * with the page — two stuck bars would eat a third of a phone screen.
 *
 * It states the discount and the deadline in one line; the deadline is the
 * shared `promo.endsAt`, so this and the final CTA can never disagree.
 *
 * `ctaHref` exists for the builder page, where `#pricing` is not on the page
 * and the link has to lead back to the landing page's plans.
 */
export default function PromoBar({ ctaHref = promo.cta.href }) {
  return (
    <div className="on-accent bg-linear-to-r from-dream-600 via-dream-500 to-dream-700 text-white">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-s6 gap-y-s2 py-s4 text-center text-sm">
          <span className="flex items-center gap-s3 font-semibold">
            <span
              aria-hidden="true"
              className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/20"
            >
              <Icon name="flame" size={14} />
            </span>
            {promo.badge} {promo.plan}
          </span>

          <span className="flex items-center gap-s3">
            <span className="text-white/85">{promo.note}</span>
            <Countdown endsAt={promo.endsAt} compact />
          </span>

          <a
            href={ctaHref}
            className="inline-flex items-center gap-s2 rounded-full px-s4 py-s1 font-semibold underline underline-offset-4 transition-colors duration-150 hover:bg-white/15"
          >
            {promo.cta.label}
            <Icon name="arrowRight" size={14} />
          </a>
        </div>
      </Container>
    </div>
  )
}

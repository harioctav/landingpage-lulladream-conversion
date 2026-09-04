import { useEffect, useRef, useState } from 'react'
import cx from '@/lib/cx'
import { observeReveal } from '@/lib/revealScheduler'

/**
 * Reveals its children with an upward mask wipe when they enter the viewport.
 *
 * The wipe is a `clip-path` inset animated open from the bottom edge, eased
 * fast to slow. It fires once and never re-hides — content that disappears
 * when you scroll back up is a bug, not an effect.
 *
 * `immediate` reveals on mount instead of on scroll, for above-the-fold
 * content. `delay` staggers siblings.
 *
 * The `reveal` utility disables itself entirely under `prefers-reduced-motion`,
 * where the content simply starts visible.
 *
 * The clip is removed once the wipe finishes: leaving `inset(0)` in place would
 * crop whatever legitimately overflows the box — glows, shadows — into a hard
 * rectangle.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  immediate = false,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    if (immediate) {
      // A frame's grace so the transition has an initial state to run from.
      const id = requestAnimationFrame(() => setShown(true))
      return () => cancelAnimationFrame(id)
    }

    const el = ref.current
    if (!el) return

    return observeReveal(el, () => setShown(true))
  }, [immediate])

  // Safety net: `transitionend` will not fire if the transition never runs
  // (tab hidden, motion disabled downstream), and the clip must not be left on.
  useEffect(() => {
    if (!shown || settled) return
    const id = setTimeout(() => setSettled(true), delay + 1400)
    return () => clearTimeout(id)
  }, [shown, settled, delay])

  return (
    <Tag
      ref={ref}
      data-revealed={shown ? '' : undefined}
      data-settled={settled ? '' : undefined}
      onTransitionEnd={(event) => {
        // Only this element's own wipe counts — the event bubbles from children.
        if (event.target === ref.current && event.propertyName === 'clip-path') {
          setSettled(true)
        }
      }}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cx('reveal', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

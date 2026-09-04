import cx from '@/lib/cx'

/**
 * Drifting stars for the purple closing-CTA band. Decorative only: `aria-hidden`,
 * unfocusable, and stilled entirely by the reduced-motion rule in the base
 * layer. Positions are deterministic so the field does not reshuffle on
 * re-render.
 */
const STARS = Array.from({ length: 44 }, (_, i) => {
  const golden = (i * 137.508) % 100
  return {
    left: golden,
    top: ((i * i * 31) % 97) + 1,
    size: (i % 4) + 2,
    delay: (i % 7) * 0.6,
    duration: 3.5 + (i % 5),
  }
})

export default function Starfield({ className = '' }) {
  return (
    <div aria-hidden="true" className={cx('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {STARS.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-white" 
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  )
}

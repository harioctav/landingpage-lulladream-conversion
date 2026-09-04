/**
 * Shared scroll scheduler for reveal-on-enter.
 *
 * IntersectionObserver cannot drive this effect: the reveal hides its element
 * with `clip-path: inset(100% 0 0 0)`, which leaves zero visible area, so the
 * observer reports `intersectionRatio: 0` and never fires — the element stays
 * masked forever. `getBoundingClientRect()` reports the layout box regardless
 * of clipping, so geometry is read directly instead.
 *
 * One rAF-throttled listener serves every pending element and detaches itself
 * once the last one has been revealed.
 */
const pending = new Set()
let frame = 0

function check() {
  frame = 0
  // Reveal anything whose top edge has crossed 90% of the viewport height.
  // Using `<` (not a band) also catches elements already scrolled past, so a
  // fast scroll, an anchor jump or a restored scroll position cannot skip one.
  const limit = window.innerHeight * 0.9

  for (const entry of pending) {
    if (entry.el.getBoundingClientRect().top < limit) {
      pending.delete(entry)
      entry.reveal()
    }
  }

  if (pending.size === 0) detach()
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(check)
}

function attach() {
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
}

function detach() {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
}

export function observeReveal(el, reveal) {
  const entry = { el, reveal }
  if (pending.size === 0) attach()
  pending.add(entry)
  schedule() // catch anything already in view on first paint

  return () => {
    pending.delete(entry)
    if (pending.size === 0) detach()
  }
}

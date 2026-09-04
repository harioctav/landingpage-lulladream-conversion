# LullaDream — Landing Page

Warm-traffic **conversion** page for LullaDream (AI bedtime stories): it is
shown to trial users and the email list, and its only job is to unlock the paid
plan before the trial expires.
React + Vite + Tailwind CSS v4, governed by the token contract in
`lulladream.md`. **Light theme** — see the palette note below.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
npm run lint
```

## Structure

```
assets/                     Source images
  AVIF/                     Story cover art (used by the awareness page only)
  PNG/                      Photography and avatars
  SVG/                      Brand logo and decorative shapes
src/
  index.css                 Design tokens (@theme) + base layer + utilities
  lib/assets.js             Every image imported once, with intrinsic ratios
                            (logo, photography, avatars, shapes)
  lib/blobPaths.js          Generated organic photo silhouettes
  lib/cx.js                 Class-name joiner
  data/content.js           All page copy, as data
  components/ui/            Button, Icon, Logo, Section, Decor, Starfield,
                            Countdown, Photo, Reveal, BlobDefs
  components/sections/      The 6 page sections, in render order
  App.jsx                   Skip link · Navbar · main · Footer
```

## Page structure

Follows the conversion brief top to bottom:

1. **Hero** — urgency headline, subheadline, a *single* primary CTA, and a
   trial-status card ("2 stories left") floating over the photograph.
2. **Free vs Premium** — one comparison table, Premium column highlighted.
3. **Pricing** — monthly and annual, "Most popular" + "Save 50%" on the annual
   plan, with the result-carrying testimonial directly above the table.
4. **Testimonial / trust** — rating, review marquee, checkout trust badges.
5. **Guarantee** — money-back, cancel-in-one-tap, secure checkout.
6. **Final CTA banner** — live trial-expiry countdown.

Copy leads with **loss aversion**, not features: what is ending (the ritual,
the free stories) comes before what is offered. The hero photograph is the
product *in use* — a laughing child mid-story — rather than the awareness
page's dreamy night imagery, and the hero no longer fills the viewport, so the
comparison table starts before the fold on a laptop.

Two conversion rules the layout enforces:

- **One CTA in the hero.** A secondary button there splits the decision; every
  other CTA on the page points at `#pricing` or checkout.
- **The risk reducer sits with the price**, inside each plan card, not three
  sections below it.

The countdown in `FinalCta` is seeded from `finalCta.expiresInHours`. Wire it to
the account's real `trialEndsAt` before shipping — a countdown that resets on
every reload is a dark pattern, not urgency.

## The squashed-SVG fix

The asset export ships **two copies of every decorative shape**. The
`svg-1xx`, `svg-2` and `svg-3` copies declare `width="100%" height="100%"` with
`preserveAspectRatio="none"` — no intrinsic ratio, so they stretch to fill
whatever box they land in. Each has a pixel-sized twin:

| Stretched | Correct twin | Size |
| --- | --- | --- |
| `svg-104` | `svg1148744201_643` | 231×244 |
| `svg-105` | `svg1461738047_385` | 140×116 |
| `svg-106` | `svg1267207472_4673` | 63×49 |
| `svg-107` | `svg1031543220_9253` | 100×103 |
| `svg-108` | `svg-1862830764_11036` | 119×122 |
| `svg-109` | `svg-695880022_913` | 171×174 |
| `svg-110` | `svg1358484439_910` | 149×143 |
| `svg-111` | `svg-1643664828_719` | 129×126 |
| `svg-112` | `svg285309579_906` | 138×138 |
| `svg-113` | `svg-1203999258_25150` | 101×68 |
| `svg-114` | `svg-202640766_9260` | 127×131 |
| `svg-115` | `svg-889674449_700` | 253×145 |
| `svg-2` | `svg-882616378_4701` | 62×49 |
| `svg-3` | `svg539152021_720` | 121×121 |

Only the twins are imported. On top of that, `src/lib/assets.js` exports a
`shapeRatios` map and `Decor` pins `aspect-ratio` from it, so a shape cannot be
squashed even if a caller sets an odd box. Source files were not modified.

The brand logo hit the same class of bug from a different direction: it is
4010×2127 **with no viewBox**, so leaving it to size itself rendered it 4010px
wide, and inside the footer's column flex container it stretched to the
container width. `Logo` pins `w-auto`, `self-start` and `object-contain`, so
the lockup holds its ratio wherever it is placed.

Verified: every `<img>` on the page renders within 2% of its intrinsic ratio.
The only two that differ are photographs using `object-fit: cover`, which crops
rather than distorts.

## Design tokens

Declared once in the `@theme` block of `src/index.css`; components consume the
generated utilities and never raw hex.

| Group | Tokens |
| --- | --- |
| Type | `--font-sans` (Inter, per the contract) |
| Body scale | `text-xs 12` · `sm 14` · `md 16` · `lg 18` · `xl 20` |
| Display scale | `d1 40` · `d2 32` · `d3 24` — documented extensions; the contract's scale stops at 20px, which no headline can use |
| Spacing | `s1 2` · `s2 8` · `s3 10` · `s4 12` · `s5 16` · `s6 20` · `s7 24` · `s8 26` |
| Radius | `xs 8` · `sm 10` · `md 20` · `lg 28` · `xl 36` · `full` |
| Elevation | `shadow-1/2/3` from the contract, plus `shadow-glow` — the contract's shadows are invisible on a black ground |
| Motion | `--motion-instant 150ms` · `--motion-fast 200ms` |

### Colour — and why this page is light, not dark

Straight from `lulladream.md`, converted from oklch:

| Contract token | Hex | Used as |
| --- | --- | --- |
| `text.primary` | `#0a0a0a` | headings and body |
| `text.secondary` | `#ffffff` | text on the purple CTA |
| `text.tertiary` | `#99a1af` | **non-text / decorative only** — 2.60:1 on white |
| `text.inverse` | `#131313` | dark text on tinted chips |
| `surface.muted` | `#595cff` | brand purple, all CTAs |
| `surface.raised` | `#ebeeff` | alternating section bands |
| `surface.strong` | `#e0e5ff` | pressed / hover panels |
| `border.default` | `#e5e5e5` | hairline borders |
| `surface.base` | `#000000` | night sky inside the story-cover art |

**`surface.base=#000000` is not the page background.** Reading it as one is
what produced an all-dark first draft, and it was wrong. The test that settles
it:

```
text.primary #0a0a0a  on  surface.base #000000   =  1.06:1   (invisible)
text.primary #0a0a0a  on  white                  = 19.80:1
```

No design system ships its primary text at 1.06:1 against its own base. Every
other token in the palette is unambiguously light — near-white `raised` and
`strong` surfaces, a `#e5e5e5` hairline border, near-black primary and inverse
text — and the brand logo sets "DREAM" in `#333333`, which disappears on a dark
ground. `text.secondary=#ffffff` is not evidence of a dark theme either: it is
the on-accent token, white on the purple button at 4.77:1. The source doc's own
extraction diagnostics flag low confidence on inferred context.

`#000000` is still used, where it genuinely belongs: the night sky inside the
illustrated story covers.

### Two deliberate deviations

1. **Focus ring.** The contract's `oklab(0.708 0 0 / 0.5)` is a 50% grey at
   2.6:1 on white. The ring is `dream-600`, which clears 3:1 on every surface
   (6.06 white / 5.25 raised / 4.85 strong), and flips to white on the purple
   band.
2. **`text-muted` (`#5f6675`).** `text.tertiary` fails AA for body copy, so it
   is reserved for decoration and `text-muted` is added as a documented step —
   the lightest grey still clearing 4.5:1 on all three light surfaces (5.76 /
   5.00 / 4.62).

Text on the purple CTA band is solid white throughout: translucent white drops
to 3.6:1 there, so hierarchy comes from size and weight instead of opacity.

## Component states

`Button` implements all seven required states — default, hover, focus-visible,
active, disabled, loading (`aria-busy` + spinner + SR text) and error. Cards,
links and FAQ rows define default, hover, focus-visible and active.

## Motion

Three pieces of the page move. All are decorative, all are frozen by
`prefers-reduced-motion: reduce`, and all are verified in test rather than
merely declared.

- **Floating hero image** (`animate-float`). The hero artwork is a plain
  rounded square — no silhouette competes with the illustration — that rises
  16px and settles back over 6.5s on `ease-in-out`, so it slows at both ends
  and never reads as a bounce. The keyframe starts and ends at the same
  transform, so the loop has no visible seam.

  The other photographs still use the organic silhouettes (`Photo` with
  `shape`), and `Photo`'s `spin` mode — mask turns, image counter-rotates —
  remains available but is unused on this page.
- **Testimonial marquee.** The quotes render twice — the clones are
  `aria-hidden`, so each review is announced once — and the track translates
  −50%, which loops seamlessly because the gap sits on each item rather than on
  the flex container. It pauses on hover and whenever focus enters the strip
  (which is a tab stop), and freezes under reduced motion.

  **Open accessibility item:** the visible pause button was removed by request.
  **WCAG 2.2 SC 2.2.2 (Level A)** requires a mechanism to pause content that
  scrolls automatically for more than five seconds, and hover does not count —
  it is unreachable by keyboard and touch. Focus-within covers a keyboard user
  who happens to tab into the strip, but not one who never does, and not a
  touch user at all. Restoring the button, or making the scroll start only on
  interaction, would close this.

- **Mobile menu slide-down.** The sheet animates `grid-template-rows` from
  `0fr` to `1fr`, which is the one way to transition to a content-driven height
  without hard-coding one — the panel keeps working however the link list
  grows. Two details it depends on: the clipping wrapper must carry no padding
  of its own (padding is not collapsed by a zero-height row, so the closed
  panel would sit 40px tall), and the panel stays mounted, so `inert` is what
  keeps it out of the tab order and the accessibility tree while closed —
  `hidden` would kill the transition.

- **Scroll reveal** (`Reveal` + `src/lib/revealScheduler.js`). Blocks are masked
  off at the bottom edge and wiped upward with `clip-path`, eased
  `cubic-bezier(0.16, 1, 0.3, 1)` — fast out, long slow settle. The hero
  reveals on load with a stagger; everything below reveals on approach. It
  fires once and never re-hides.

  Two traps here, both worth knowing about.

  **The clip must be dropped once the wipe ends.** Leaving `clip-path:
  inset(0)` in place crops everything that legitimately overflows the box — the
  soft glows behind the photos, card shadows — into a hard-edged rectangle. The
  component clears it on `transitionend` (with a timer as a safety net), and a
  test asserts no revealed block keeps a clip-path.

  **IntersectionObserver cannot drive a clip-path reveal.** `inset(100% 0 0 0)` leaves zero visible area, so the observer
  reports `intersectionRatio: 0` and never fires — the element stays masked
  forever, and the content is simply never seen. The scheduler reads
  `getBoundingClientRect()` instead, which reports the layout box regardless of
  clipping, from one rAF-throttled listener shared by every pending element.
  Its threshold is "top edge above 90% of the viewport", so a fast scroll, an
  anchor jump or a restored scroll position cannot skip a block.

## Accessibility

Target **WCAG 2.2 AA**. axe-core at 1440px and 390px: **0 violations**.

- Skip link is the first tab stop and reveals on focus.
- The Free/Premium comparison is one real `<table>` at every width, with row
  and column headers. It uses `border-separate` with zero spacing rather than
  `border-collapse`, because collapsed borders ignore `border-radius` — the
  highlighted Premium column needs its own 27px corners to curve inside the
  container's 28px ones instead of being sliced by `overflow-hidden`. The cost
  is that a `<tr>` can no longer paint a border, so from `sm` up each cell
  carries its own row rule. On phones the cells stack as blocks and each value
  repeats its column name, so the relationships survive the reflow.
- "Not included" cells carry the words as well as the dash — meaning is never
  left to a glyph or a colour alone.
- The countdown is a `role="timer"` whose digits are `aria-hidden`; a visually
  hidden sentence states the remaining time in whole hours and minutes, because
  a per-second live region is unusable with a screen reader.
- The trial meter is a real `<progress>` with an accessible label, so the ratio
  is announced rather than implied by a coloured bar.
- Every decorative element (starfield, shapes, glows) is `aria-hidden` and
  unfocusable; ornaments are hidden below `lg`, where they land on the copy.
- The testimonial marquee is a keyboard tab stop and pauses on focus-within.
  See the open SC 2.2.2 item under **Motion**.
- Touch targets are ≥44×44px. `prefers-reduced-motion: reduce` stills the
  starfield and every transition — verified in test, not just declared.

## Responsive

No horizontal overflow at 320 · 360 · 390 · 430 · 640 · 768 · 834 · 900 · 1024
· 1280 · 1440 · 1920px.

On phones the hero CTA goes full width, the trial card drops below the
photograph instead of overlapping it, the comparison table reflows from columns
to stacked blocks, and the plan cards stack with the annual card losing its
`lg` offset. All revert from `sm`/`lg` up.

## Known gaps before launch

- **Prices, the trial counter and the countdown are placeholder content.**
  `$9.99` / `$4.99`, "2 stories left" and `expiresInHours: 48` all live in
  `src/data/content.js` and must be driven by the account before launch.
  Claims made in copy — the 30-day money-back guarantee, the 4.9 rating, the
  "2,400+ parents" — need to be true or removed.

- **Checkout is not wired.** Both plan CTAs point at `#checkout`.

- **The hero image is story artwork, not photography.** `cover-4.avif`
  (Phra Aphai Mani) is used by request. The brief asks for a child mid-laugh
  with headphones or a tablet; no such frame exists in the supplied library, so
  swap in real in-use photography before a paid retargeting spend. The other
  three covers stay in `assets/AVIF/` for the awareness page and are not
  imported here.
- **Ratings, quote counts and review text are illustrative.** Replace with real
  attributed reviews before publishing; fabricated social proof is a legal
  exposure, not just a copy placeholder.
- ~~The wordmark is set in type~~ — resolved: `assets/SVG/logo-lulladream.svg`
  is now used in the navbar and footer.

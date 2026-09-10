import { useEffect, useId, useRef, useState } from 'react'
import { builder } from '@/data/create'
import { promo } from '@/data/content'
import { generateStory } from '@/lib/storyGenerator'
import cx from '@/lib/cx'
import Button from '@/components/ui/Button'
import Countdown from '@/components/ui/Countdown'
import Decor from '@/components/ui/Decor'
import Icon from '@/components/ui/Icon'
import Logo from '@/components/ui/Logo'
import PromoBar from '@/components/ui/PromoBar'

/**
 * Animal-story builder — where every campaign CTA lands.
 *
 * Modelled on the app's "Generate Your Story" flow, cut down to the three
 * decisions this story needs: the animal, the child, the mood. Title, moral,
 * story type and duration are left to sensible defaults — each extra step is
 * a place to drop off.
 *
 * The generator is `src/lib/storyGenerator.js`, currently a template stub.
 * It is awaited here exactly as a network call would be, so swapping in the
 * real API changes nothing on this page.
 */
const MIN_LOADING_MS = 2400
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/* Radio cards. The input is visually hidden but stays the real control, so
   arrow keys move between options, the group is announced as a group, and
   `has-checked` / `has-focus-visible` style the card from the input's state.
   The selected state adds a 1px ring on top of the 1px border, reading as a
   2px frame without shifting the layout. */
const optionCard = cx(
  'relative flex cursor-pointer select-none rounded-md border border-border-default bg-surface-base text-text-primary',
  'transition-[border-color,background-color,box-shadow] duration-150 hover:border-border-strong',
  'has-checked:border-action-primary has-checked:bg-dream-100/60 has-checked:ring-1 has-checked:ring-action-primary',
  'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus-ring',
)

const inputClass = cx(
  'min-h-12 w-full rounded-sm border border-border-strong bg-surface-base px-s5 text-md text-text-primary shadow-1',
  'placeholder:text-text-muted transition-colors duration-150 hover:border-text-primary focus:border-action-primary',
)

function Required() {
  return (
    <span aria-hidden="true" className="text-badge-discount">
      {' '}*
    </span>
  )
}

function Option({ name, value, checked, onChange, className = '', children }) {
  return (
    <label className={cx(optionCard, className)}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {children}
    </label>
  )
}

/* Focus moves here on every step change, so a screen-reader user hears where
   they have landed. It is never in the tab order (tabIndex -1), which is why
   it can skip the focus ring that interactive elements must keep. */
function StepHeading({ id, ref, children, className = '' }) {
  return (
    <h2
      id={id}
      ref={ref}
      tabIndex={-1}
      className={cx('text-balance text-center text-d3 text-text-primary focus-visible:outline-none', className)}
    >
      {children}
    </h2>
  )
}

/** Deep links such as `/create/?animal=lion` arrive with the animal chosen. */
function animalFromUrl() {
  const wanted = new URLSearchParams(window.location.search).get('animal')
  return builder.animals.some((a) => a.id === wanted && a.id !== 'other') ? wanted : null
}

function LoadingSheet({ progress }) {
  return (
    <div className="absolute inset-0 z-20 flex items-end bg-ink-900/40">
      <div
        role="status"
        aria-live="polite"
        className="w-full rounded-t-xl bg-surface-base px-s8 pb-12 pt-10 text-center shadow-3"
      >
        <span
          aria-hidden="true"
          className="mx-auto block size-11 animate-spin rounded-full border-4 border-dream-100 border-t-action-primary"
        />
        <h2 className="mt-s7 text-xl font-bold text-text-primary">{builder.loading.title}</h2>
        <p className="mt-s3 text-md text-text-muted">{builder.loading.body}</p>
        <progress
          value={progress}
          max={100}
          aria-label="Story progress"
          className="mx-auto mt-s7 block h-2 w-full max-w-60 appearance-none overflow-hidden rounded-full border-0 bg-surface-strong [&::-moz-progress-bar]:bg-action-primary [&::-webkit-progress-bar]:bg-surface-strong [&::-webkit-progress-value]:bg-action-primary"
        />
        <p aria-hidden="true" className="mt-s3 text-sm tabular-nums text-text-muted">
          {progress}%
        </p>
      </div>
    </div>
  )
}

function Result({ story, headingRef, onReset }) {
  const r = builder.result
  const upsellId = useId()

  return (
    <article className="flex grow flex-col bg-surface-raised">
      <div className="px-s7 pb-s7 pt-s6">
        <button
          type="button"
          onClick={onReset}
          aria-label={r.again}
          className="inline-flex size-11 items-center justify-center rounded-full text-text-primary transition-colors duration-150 hover:bg-surface-strong"
        >
          <Icon name="arrowLeft" size={24} />
        </button>
        <p className="mt-s4 text-sm font-medium text-text-muted">{story.category}</p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-s2 text-balance text-d3 text-text-primary focus-visible:outline-none sm:text-d2"
        >
          {story.title}
        </h1>
      </div>

      {/* Bottom padding leaves room for the floating Listen button, so at the
          end of the page it sits over empty space rather than the last button. */}
      <div className="flex grow flex-col gap-s8 rounded-t-xl bg-surface-base px-s7 pb-28 pt-s7 shadow-1">
        <section>
          <h2 className="text-md font-semibold text-text-primary">{r.readLabel}</h2>
          <div className="mt-s5 flex flex-col gap-s6">
            {story.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-pretty text-lg leading-[1.7] text-text-primary">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <aside
          aria-labelledby={upsellId}
          className="rounded-lg border-2 border-action-primary bg-surface-base p-s7 shadow-3"
        >
          <p className="flex items-center gap-s3 text-xs font-semibold uppercase tracking-[0.14em] text-action-primary-active">
            <Icon name="wave" size={15} />
            {r.upsellEyebrow}
          </p>
          <div className="mt-s4 flex flex-wrap items-center gap-s3">
            <span className="inline-flex items-center gap-s2 rounded-full bg-badge-discount px-s4 py-s1 text-xs font-bold uppercase tracking-[0.1em] text-white">
              <Icon name="flame" size={13} />
              {promo.badge}
            </span>
            <h2 id={upsellId} className="text-xl font-bold text-text-primary">
              {r.upsellTitle}
            </h2>
          </div>
          <p className="mt-s4 text-pretty text-md text-text-muted">{r.upsellBody}</p>

          <div className="mt-s6 rounded-md bg-surface-raised px-s5 py-s5">
            <Countdown endsAt={promo.endsAt} label={promo.note} size="sm" />
          </div>

          <Button
            href={r.upsellCta.href}
            size="lg"
            icon="arrowRight"
            wrap
            className="mt-s6 w-full text-center"
          >
            {r.upsellCta.label}
          </Button>
          <p className="mt-s4 text-center text-sm text-text-muted">{r.upsellNote}</p>
        </aside>

        <Button type="button" variant="outline" size="lg" onClick={onReset} className="w-full">
          {r.again}
        </Button>
      </div>

      {/* Listening is the Super Premium feature, so the button says so — a
          bare play icon that led to pricing would be a bait-and-switch. */}
      <div className="pointer-events-none sticky bottom-s7 z-10 -mt-24 flex justify-end px-s7">
        <a
          href={r.upsellCta.href}
          className="pointer-events-auto inline-flex min-h-14 items-center gap-s3 rounded-full bg-action-primary pl-s5 pr-s6 text-md font-semibold text-white shadow-glow transition-colors duration-150 hover:bg-action-primary-hover active:bg-action-primary-active"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-white/20">
            <Icon name="play" size={18} className="fill-current" />
          </span>
          {r.listenLabel}
          <Icon name="lock" size={16} className="opacity-80" />
        </a>
      </div>
    </article>
  )
}

export default function CreateStory() {
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState('form') // 'form' | 'loading' | 'result'
  const [animal, setAnimal] = useState(animalFromUrl)
  const [customAnimal, setCustomAnimal] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState(null)
  const [mood, setMood] = useState('gentle')
  const [progress, setProgress] = useState(0)
  const [story, setStory] = useState(null)
  const [error, setError] = useState(null)

  const headingRef = useRef(null)
  // Focus follows navigation, but not the first paint: moving focus on load
  // would scroll the page and steal it from wherever the browser put it.
  const navigated = useRef(false)

  const headingId = useId()
  const otherId = useId()
  const nameId = useId()
  const ageId = useId()

  useEffect(() => {
    if (!navigated.current) return
    if (phase === 'result') window.scrollTo({ top: 0 })
    if (phase !== 'loading') headingRef.current?.focus({ preventScroll: phase === 'result' })
  }, [step, phase])

  const chosen = builder.animals.find((a) => a.id === animal)
  const valid = [
    Boolean(animal) && (animal !== 'other' || customAnimal.trim().length > 0),
    name.trim().length > 0 && Boolean(age),
    Boolean(mood),
  ][step]
  const isLast = step === builder.steps.length - 1

  async function handleSubmit(event) {
    event.preventDefault()
    if (!valid) return
    navigated.current = true

    if (!isLast) {
      setStep((s) => s + 1)
      return
    }

    setError(null)
    setProgress(0)
    setPhase('loading')

    // The bar tracks time, not the request: it runs to 99% over the minimum
    // wait and only reaches 100 once the story is actually back.
    const started = performance.now()
    let frame = requestAnimationFrame(function tick(now) {
      const pct = Math.min(99, Math.floor(((now - started) / MIN_LOADING_MS) * 100))
      setProgress(pct)
      if (pct < 99) frame = requestAnimationFrame(tick)
    })

    try {
      const [result] = await Promise.all([
        generateStory({ name, age, animal: { ...chosen, custom: customAnimal }, mood }),
        wait(MIN_LOADING_MS),
      ])
      cancelAnimationFrame(frame)
      setProgress(100)
      await wait(300)
      setStory(result)
      setPhase('result')
    } catch {
      cancelAnimationFrame(frame)
      setError('We couldn’t write that story just now. Please try again.')
      setPhase('form')
    }
  }

  function goBack() {
    navigated.current = true
    setStep((s) => Math.max(0, s - 1))
  }

  // Keeps the name, age and mood: "another story" usually means another animal.
  function reset() {
    navigated.current = true
    setStory(null)
    setStep(0)
    setPhase('form')
  }

  return (
    <div className="min-h-svh bg-surface-raised">
      <PromoBar ctaHref={builder.result.upsellCta.href} />

      <div className="relative isolate mx-auto w-full max-w-lg sm:px-s6 sm:pb-16 sm:pt-8">
        <Decor name="shapeCloud" tint={false} className="left-[-40%] top-[12%] w-44 opacity-70" float />
        <Decor name="shapeSparkleAlt" tint={false} className="right-[-30%] top-[30%] w-16 opacity-70" />
        <Decor name="shapeCloudLarge" tint={false} className="right-[-42%] bottom-[12%] w-40 opacity-60" float />

        <a
          href={builder.backToSite}
          aria-label="LullaDream — back to the offer"
          className="mb-s6 hidden justify-center rounded-sm sm:flex"
        >
          <Logo className="h-12 self-center" />
        </a>

        {/* `overflow-clip`, not `overflow-hidden`: hidden makes the card a
            scroll container, and the sticky footer and Listen button would
            then stick to the card instead of the viewport. Clip rounds the
            corners without that side effect. */}
        <div className="relative flex min-h-svh flex-col overflow-clip bg-surface-base sm:min-h-[44rem] sm:rounded-xl sm:border sm:border-border-default sm:shadow-3">
          {phase === 'result' && story ? (
            <Result story={story} headingRef={headingRef} onReset={reset} />
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              inert={phase === 'loading'}
              className="flex grow flex-col"
            >
              <header className="on-accent rounded-b-xl bg-action-primary px-s7 pb-s7 pt-s5 text-white">
                {step === 0 ? (
                  <a
                    href={builder.backToSite}
                    aria-label="Back to the offer"
                    className="inline-flex size-11 items-center justify-center rounded-full transition-colors duration-150 hover:bg-white/15"
                  >
                    <Icon name="arrowLeft" size={24} />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={goBack}
                    aria-label="Back to the previous step"
                    className="inline-flex size-11 items-center justify-center rounded-full transition-colors duration-150 hover:bg-white/15"
                  >
                    <Icon name="arrowLeft" size={24} />
                  </button>
                )}

                <h1 className="mt-s3 flex items-center gap-s3 text-d3 text-white">
                  <Icon name="sparkle" size={26} className="shrink-0 text-sun-300" />
                  {builder.title}
                </h1>

                <p className="sr-only">
                  Step {step + 1} of {builder.steps.length}
                </p>
                <ol aria-hidden="true" className="mt-s5 grid grid-cols-3 gap-s3">
                  {builder.steps.map((s, i) => (
                    <li
                      key={s.id}
                      className={cx(
                        'h-1.5 rounded-full transition-colors duration-200',
                        i <= step ? 'bg-white' : 'bg-white/35',
                      )}
                    />
                  ))}
                </ol>
              </header>

              <div className="flex grow flex-col gap-s7 px-s7 py-s8">
                {error && (
                  <p
                    role="alert"
                    className="rounded-md border border-[#ffbcbc] bg-[#ffe3e3] px-s5 py-s4 text-sm text-[#8a1111]"
                  >
                    {error}
                  </p>
                )}

                {step === 0 && (
                  <fieldset aria-labelledby={headingId} className="flex flex-col gap-s7">
                    <StepHeading id={headingId} ref={headingRef}>
                      {builder.steps[0].heading}
                    </StepHeading>

                    <div className="grid grid-cols-3 gap-s4">
                      {builder.animals.map((a) => (
                        <Option
                          key={a.id}
                          name="animal"
                          value={a.id}
                          checked={animal === a.id}
                          onChange={setAnimal}
                          className="flex-col items-center justify-center gap-s2 px-s2 py-s5 text-center"
                        >
                          <span aria-hidden="true" className="text-[32px] leading-none">
                            {a.emoji}
                          </span>
                          <span className="text-sm font-semibold leading-tight">{a.name}</span>
                        </Option>
                      ))}
                    </div>

                    {animal === 'other' && (
                      <div className="flex flex-col gap-s3">
                        <label htmlFor={otherId} className="text-md font-semibold text-text-primary">
                          {builder.otherLabel}
                          <Required />
                        </label>
                        <input
                          id={otherId}
                          type="text"
                          required
                          aria-required="true"
                          maxLength={builder.otherMax}
                          value={customAnimal}
                          placeholder={builder.otherPlaceholder}
                          onChange={(e) => setCustomAnimal(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    )}
                  </fieldset>
                )}

                {step === 1 && (
                  <div className="flex flex-col gap-s7">
                    <StepHeading id={headingId} ref={headingRef}>
                      {builder.steps[1].heading}
                    </StepHeading>

                    <div className="flex flex-col gap-s3">
                      <label htmlFor={nameId} className="text-md font-semibold text-text-primary">
                        {builder.nameLabel}
                        <Required />
                      </label>
                      <input
                        id={nameId}
                        type="text"
                        required
                        aria-required="true"
                        autoComplete="off"
                        maxLength={builder.nameMax}
                        value={name}
                        placeholder={builder.namePlaceholder}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass}
                      />
                      <p aria-hidden="true" className="text-right text-xs tabular-nums text-text-muted">
                        {name.length}/{builder.nameMax}
                      </p>
                    </div>

                    <fieldset aria-labelledby={ageId} className="flex flex-col gap-s4">
                      <p id={ageId} className="text-md font-semibold text-text-primary">
                        {builder.ageLabel}
                        <Required />
                      </p>
                      <div className="grid grid-cols-2 gap-s4">
                        {builder.ages.map((a) => (
                          <Option
                            key={a.id}
                            name="age"
                            value={a.id}
                            checked={age === a.id}
                            onChange={setAge}
                            className="items-center justify-center px-s4 py-s7 text-lg font-medium"
                          >
                            {a.label}
                          </Option>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                )}

                {step === 2 && (
                  <fieldset aria-labelledby={headingId} className="flex flex-col gap-s7">
                    <StepHeading id={headingId} ref={headingRef}>
                      {builder.steps[2].heading}
                    </StepHeading>

                    <div className="grid grid-cols-2 gap-s4">
                      {builder.moods.map((m) => (
                        <Option
                          key={m.id}
                          name="mood"
                          value={m.id}
                          checked={mood === m.id}
                          onChange={setMood}
                          className="flex-col items-center justify-center gap-s3 px-s4 py-s7 text-center"
                        >
                          <span aria-hidden="true" className="text-[32px] leading-none">
                            {m.emoji}
                          </span>
                          <span className="text-md font-semibold leading-tight">{m.label}</span>
                        </Option>
                      ))}
                    </div>
                  </fieldset>
                )}
              </div>

              <div className="sticky bottom-0 z-10 mt-auto rounded-t-xl border-t border-border-default bg-surface-base px-s7 py-s6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={!valid}
                  icon={isLast ? undefined : 'arrowRight'}
                  className="w-full"
                >
                  {isLast ? `✨ ${builder.generate}` : builder.next}
                </Button>
              </div>
            </form>
          )}

          {phase === 'loading' && <LoadingSheet progress={progress} />}
        </div>
      </div>
    </div>
  )
}

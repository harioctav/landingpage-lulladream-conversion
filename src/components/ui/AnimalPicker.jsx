import { useId, useState } from 'react'
import { hero } from '@/data/content'
import cx from '@/lib/cx'
import Icon from './Icon'

/**
 * The campaign demo: pick the animal from the Instagram post, type the child's
 * name, and see the story it becomes. Visitors arrive having just decided what
 * their child's favourite animal is — this lets them feel the generate step
 * before the page asks for anything.
 *
 * Nothing here calls the model; the titles are written copy in
 * `hero.picker.animals`. Wire it to the real generator when the campaign
 * endpoint exists — but keep the response instant, the point is the feeling of
 * one tap, not a spinner.
 *
 * Accessibility: the chips are toggle buttons in a labelled group (each a
 * normal tab stop, Enter/Space native), and the preview is a polite live
 * region, so the new title is announced instead of changing silently.
 */
const picker = hero.picker

export default function AnimalPicker({ className = '' }) {
  const [animal, setAnimal] = useState(picker.animals[0])
  const [name, setName] = useState('')
  const nameId = useId()

  const childName = name.trim() || picker.fallbackName
  const title = animal.title.replace('{name}', childName)

  return (
    <div
      className={cx(
        'flex flex-col gap-s6 rounded-lg border border-border-default bg-surface-base p-s7 shadow-3',
        className,
      )}
    >
      <p className="flex items-center gap-s3 text-xs font-semibold uppercase tracking-[0.14em] text-action-primary-active">
        <Icon name="sparkle" size={15} />
        {picker.label}
      </p>

      <div className="flex flex-col gap-s3">
        <label htmlFor={nameId} className="text-sm font-semibold text-text-primary">
          {picker.nameLabel}
        </label>
        <input
          id={nameId}
          type="text"
          value={name}
          maxLength={24}
          autoComplete="off"
          placeholder={picker.namePlaceholder}
          onChange={(e) => setName(e.target.value)}
          className={cx(
            'min-h-11 w-full rounded-sm border border-border-strong bg-surface-base px-s5 text-md',
            'text-text-primary placeholder:text-text-muted',
            'transition-colors duration-150 hover:border-text-primary focus:border-action-primary focus:outline-none',
          )}
        />
      </div>

      <div className="flex flex-col gap-s4">
        <p className="text-sm font-semibold text-text-primary">{picker.animalLabel}</p>

        <div role="group" aria-label={picker.animalLabel} className="flex flex-wrap gap-s3">
          {picker.animals.map((item) => {
            const active = item.id === animal.id
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setAnimal(item)}
                className={cx(
                  'inline-flex min-h-11 items-center gap-s3 rounded-full border px-s5 text-md font-semibold',
                  'transition-[background-color,border-color,color] duration-150 active:translate-y-px',
                  active
                    ? 'border-action-primary bg-action-primary text-white'
                    : 'border-border-strong bg-surface-base text-text-primary hover:border-text-primary hover:bg-surface-raised',
                )}
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  {item.emoji}
                </span>
                {item.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-md border border-dream-100 bg-surface-raised p-s6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-action-primary-active">
          {picker.previewLabel}
        </p>

        <div aria-live="polite" className="mt-s3 flex flex-col gap-s2">
          <p className="text-pretty text-lg font-bold text-text-primary">“{title}”</p>
          <p className="text-pretty text-sm text-text-muted">{animal.trait}</p>
        </div>
      </div>

      <a
        href={picker.cta.href}
        className="inline-flex items-center gap-s3 self-start rounded-full text-md font-semibold text-action-primary-active underline underline-offset-4 transition-colors duration-150 hover:text-action-primary-hover"
      >
        {picker.cta.label}
        <Icon name="arrowRight" size={16} />
      </a>
    </div>
  )
}

import { comparison } from '@/data/content'
import cx from '@/lib/cx'
import Button from '@/components/ui/Button'
import Decor from '@/components/ui/Decor'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'
import Section, { SectionHeading } from '@/components/ui/Section'

/**
 * A cell value is either a string or `false` for "not included". `false`
 * renders a dash plus a visually hidden word, so the table does not rely on a
 * glyph alone to carry meaning.
 */
function Value({ value, tone }) {
  if (value === false) {
    return (
      <span className="flex items-center gap-s3 text-text-muted">
        <span
          aria-hidden="true"
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-strong text-text-muted"
        >
          <Icon name="dash" size={14} />
        </span>
        <span className="sr-only">Not included. </span>
        <span aria-hidden="true">Not included</span>
      </span>
    )
  }

  return (
    <span className={cx('flex items-start gap-s3', tone === 'premium' ? 'text-text-primary' : 'text-text-muted')}>
      <span
        aria-hidden="true"
        className={cx(
          'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full',
          tone === 'premium' ? 'bg-action-primary text-white' : 'bg-surface-strong text-text-muted',
        )}
      >
        <Icon name="check" size={14} strokeWidth={2.2} />
      </span>
      <span className="text-pretty">{value}</span>
    </span>
  )
}

export default function Comparison() {
  const { columns, rows } = comparison

  return (
    <Section id="compare" aria-labelledby="compare-title" className="overflow-hidden bg-surface-base">
      <Decor name="shapeBlobSoft" tint={false} className="left-[-2%] top-[16%] w-28 opacity-60" float />
      <Decor name="shapeSparkle" tint={false} className="right-[4%] top-[8%] w-12 opacity-70" />

      <Reveal>
        <SectionHeading
          id="compare-title"
          eyebrow={comparison.eyebrow}
          title={comparison.title}
          body={comparison.body}
          className="mb-12 lg:mb-16"
        />
      </Reveal>

      <Reveal delay={100} className="mx-auto max-w-4xl">
        {/*
          One real <table> at every width. The layout changes with CSS only —
          on phones each row becomes a stacked block whose two values are
          labelled by the sticky-looking column captions — so the semantic
          row/column relationships survive for assistive tech.

          `border-separate` (with zero spacing) rather than `border-collapse`:
          collapsed borders ignore `border-radius`, so the Premium column's
          2px frame ran straight into the container's rounded corner and was
          sliced off by `overflow-hidden`. Separated borders let the frame
          carry its own radius and curve *inside* the container instead —
          27px, one pixel tighter than the container's 28px, which is the
          radius the container's own 1px border leaves behind.
        */}
        <div className="overflow-hidden rounded-lg border border-border-default shadow-1">
          <table className="w-full border-separate border-spacing-0 text-left max-sm:block">
            <caption className="sr-only">
              Free plan compared with Premium, feature by feature
            </caption>

            <thead>
              <tr className="max-sm:hidden">
                <th
                  scope="col"
                  className="w-[26%] rounded-tl-[27px] bg-surface-raised px-s7 py-s7 align-bottom"
                >
                  <span className="text-sm font-semibold text-text-muted">Feature</span>
                </th>

                <th scope="col" className="w-[34%] bg-surface-raised px-s7 py-s7 align-bottom">
                  <span className="flex flex-col gap-s1">
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                      {columns.free.note}
                    </span>
                    <span className="text-lg font-bold text-text-primary">{columns.free.name}</span>
                    <span className="text-sm font-medium text-text-muted">{columns.free.price}</span>
                  </span>
                </th>

                <th
                  scope="col"
                  className="w-[40%] rounded-tr-[27px] border-x-2 border-t-2 border-action-primary bg-dream-100/60 px-s7 py-s7 align-bottom"
                >
                  <span className="flex flex-col gap-s1">
                    <span className="inline-flex w-fit items-center gap-s2 rounded-full bg-action-primary px-s4 py-s1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                      <Icon name="sparkle" size={13} />
                      {columns.premium.note}
                    </span>
                    <span className="mt-s2 text-lg font-bold text-text-primary">
                      {columns.premium.name}
                    </span>
                    <span className="text-sm font-medium text-action-primary-active">
                      {columns.premium.price}
                    </span>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="max-sm:block">
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={cx(
                    'align-top max-sm:block max-sm:px-s6 max-sm:py-s7',
                    // Separated borders do not paint on a <tr>, so from `sm`
                    // up each cell carries its own rule; below `sm` the row is
                    // a block and keeps the full-width divider.
                    i > 0 && 'max-sm:border-t max-sm:border-border-default',
                    row.highlight && 'bg-surface-raised/60',
                  )}
                >
                  <th
                    scope="row"
                    className={cx(
                      'px-s7 py-s7 text-md font-semibold text-text-primary',
                      'max-sm:block max-sm:px-0 max-sm:pb-s4 max-sm:pt-0',
                      i > 0 && 'sm:border-t sm:border-border-default',
                    )}
                  >
                    {row.label}
                  </th>

                  <td
                    className={cx(
                      'px-s7 py-s7 text-md max-sm:block max-sm:px-0 max-sm:py-0',
                      i > 0 && 'sm:border-t sm:border-border-default',
                    )}
                  >
                    <span className="mb-s2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted sm:hidden">
                      {columns.free.name}
                    </span>
                    <Value value={row.free} tone="free" />
                  </td>

                  <td
                    className={cx(
                      'px-s7 py-s7 text-md sm:border-x-2 sm:border-action-primary sm:bg-dream-100/40',
                      'max-sm:mt-s4 max-sm:block',
                      'max-sm:rounded-md max-sm:border max-sm:border-dream-100 max-sm:bg-dream-100/50 max-sm:px-s5 max-sm:py-s5',
                      // A lighter rule inside the purple frame keeps the rows
                      // readable without competing with the 2px sides.
                      i > 0 && 'sm:border-t sm:border-t-dream-100',
                      i === rows.length - 1 && 'sm:rounded-br-[27px] sm:border-b-2',
                    )}
                  >
                    <span className="mb-s2 block text-xs font-semibold uppercase tracking-[0.12em] text-action-primary-active sm:hidden">
                      {columns.premium.name}
                    </span>
                    <Value value={row.premium} tone="premium" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex justify-center">
          <Button href={comparison.cta.href} size="lg" icon="arrowRight" wrap className="max-w-[19rem] text-center sm:max-w-none">
            {comparison.cta.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}

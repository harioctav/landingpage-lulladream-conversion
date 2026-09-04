import { useEffect, useId, useState } from 'react'
import { nav, site } from '@/data/content'
import cx from '@/lib/cx'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import Logo from '@/components/ui/Logo'
import { Container } from '@/components/ui/Section'

const linkBase =
  'rounded-full px-s5 py-s3 text-md font-medium text-text-muted transition-colors ' +
  'duration-150 hover:bg-surface-raised hover:text-text-primary active:bg-surface-strong'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border-default bg-surface-base/90 backdrop-blur-md">
      <Container>
        {/* The row grows with the logo: a 70px lockup in an 80px bar leaves
            5px of air and reads as if it is touching the hairline. */}
        <div className="flex h-16 items-center justify-between gap-s5 lg:h-24">
          <a href="#home" className="flex shrink-0 items-center rounded-sm" aria-label={`${site.name} — home`}>
            <Logo className="h-11 lg:h-[70px]" />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-s1 lg:flex">
            {nav.links.map((link) => (
              <a key={link.label} href={link.href} className={linkBase}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-s4">
            <Button href={nav.cta.href} size="sm" className="max-sm:hidden">
              {nav.cta.label}
            </Button>

            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-11 items-center justify-center rounded-full text-text-primary transition-colors duration-150 hover:bg-surface-raised active:bg-surface-strong lg:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} size={22} strokeWidth={1.9} />
            </button>
          </div>
        </div>
      </Container>

      {/*
        Slide-down sheet. Animating `grid-template-rows` from 0fr to 1fr is the
        one way to transition to a content-driven height without hard-coding
        one, so the panel works whatever the link list grows to.

        It stays mounted, so `inert` is what removes it from the tab order and
        the accessibility tree while closed — `hidden` would kill the
        transition, and leaving it neither hidden nor inert would let keyboard
        users tab into an invisible menu.
      */}
      <div
        id={panelId}
        inert={!open}
        className={cx(
          'grid overflow-hidden border-border-default bg-surface-base lg:hidden',
          'transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
          open ? 'grid-rows-[1fr] border-t opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        {/* The clipping wrapper must hold no padding of its own: padding is
            not collapsed by a zero-height row, so it would leave the closed
            panel 40px tall. It goes on the Container inside instead. */}
        <div className="min-h-0 overflow-hidden">
          <Container className="py-s6">
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-s1">
                {nav.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cx(
                        'flex min-h-12 items-center rounded-sm px-s4 text-lg font-medium',
                        'text-text-primary transition-colors duration-150 hover:bg-surface-raised',
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <Button
              href={nav.cta.href}
              size="lg"
              wrap
              className="mt-s6 w-full text-center sm:hidden"
              onClick={() => setOpen(false)}
            >
              {nav.cta.label}
            </Button>
          </Container>
        </div>
      </div>
    </header>
  )
}

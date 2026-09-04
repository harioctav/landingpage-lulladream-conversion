import { footer, site } from '@/data/content'
import Icon from '@/components/ui/Icon'
import Logo from '@/components/ui/Logo'
import { Container } from '@/components/ui/Section'

export default function Footer() {
  return (
    <footer className="border-t border-border-default bg-surface-base pt-16 lg:pt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.6fr))] lg:gap-8">
          <div className="flex flex-col gap-s5">
            <Logo className="h-14" />
            <p className="max-w-xs text-pretty text-md text-text-muted">{site.tagline}</p>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-s5">
              <h2 className="text-md font-semibold text-text-primary">{column.title}</h2>
              <ul className="flex flex-col gap-s4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block break-words rounded-xs text-md text-text-muted transition-colors duration-150 hover:text-action-primary-active"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-s6 border-t border-border-default py-s8 sm:flex-row">
          <p className="text-sm text-text-muted">{footer.copyright}</p>

          <ul className="flex items-center gap-s2">
            {footer.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-full text-text-muted transition-colors duration-150 hover:bg-surface-raised hover:text-text-primary active:bg-surface-strong"
                >
                  <Icon name={social.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}

/**
 * Icon set. Rounded, soft-edged only — no sharp corners, per the brand's
 * visual direction. Icons inherit `currentColor`, so tone always comes from
 * the surrounding text token rather than a hard-coded fill.
 */
const paths = {
  moon: <path d="M20.2 14.4A8.3 8.3 0 0 1 9.6 3.8a8.6 8.6 0 1 0 10.6 10.6Z" />,
  sparkle: (
    <path d="M12 3.4c.5 3.4 1.7 5.2 4.4 6.1-2.7.9-3.9 2.7-4.4 6.1-.5-3.4-1.7-5.2-4.4-6.1 2.7-.9 3.9-2.7 4.4-6.1Zm6.2 9.3c.26 1.7.87 2.6 2.2 3.05-1.33.45-1.94 1.35-2.2 3.05-.26-1.7-.87-2.6-2.2-3.05 1.33-.45 1.94-1.35 2.2-3.05Z" />
  ),
  wave: (
    <path d="M3.5 12h1.2m3-4.2v8.4m3.3-11v13.6m3.3-10.4v7.2m3.4-4.6v2m2.8-1.4h-.1" />
  ),
  shield: (
    <>
      <path d="M12 3.2 5.6 5.7v5.9c0 4.1 2.6 7.1 6.4 8.6 3.8-1.5 6.4-4.5 6.4-8.6V5.7Z" />
      <path d="m9.4 12.1 1.9 1.9 3.5-3.9" />
    </>
  ),
  lock: (
    <>
      <rect x="4.6" y="10.4" width="14.8" height="10" rx="3.4" />
      <path d="M8.4 10.4V8a3.6 3.6 0 0 1 7.2 0v2.4" />
    </>
  ),
  download: (
    <>
      <path d="M12 4.4v9.4" />
      <path d="m8.4 10.6 3.6 3.6 3.6-3.6" />
      <path d="M5 16.2v1.4a2.8 2.8 0 0 0 2.8 2.8h8.4a2.8 2.8 0 0 0 2.8-2.8v-1.4" />
    </>
  ),
  play: <path d="M9 6.6c0-.9 1-1.4 1.7-1L17.4 10c.7.4.7 1.5 0 1.9l-6.7 4.4c-.7.4-1.7 0-1.7-1Z" />,
  pause: (
    <>
      <rect x="8" y="5.5" width="3" height="13" rx="1.4" />
      <rect x="13" y="5.5" width="3" height="13" rx="1.4" />
    </>
  ),
  star: <path d="m12 3.6 2.6 5.3 5.9.86-4.25 4.14 1 5.86L12 16.99l-5.25 2.77 1-5.86L3.5 9.76l5.9-.86Z" />,
  flame: (
    <path d="M12 3.2c.4 2.5-.7 3.9-2.2 5.3-1.6 1.5-2.9 3-2.9 5.3a5.1 5.1 0 0 0 10.2 0c0-1.7-.6-2.9-1.6-4.2-.5 1-1.2 1.5-2 1.7.7-2.9-.3-6.1-1.5-8.1Z" />
  ),
  check: <path d="m5.6 12.4 4.2 4.2 8.6-9.2" />,
  dash: <path d="M7 12h10" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.4V12l3 1.8" />
    </>
  ),
  refresh: (
    <>
      <path d="M19.4 12a7.4 7.4 0 1 1-2.4-5.45" />
      <path d="M19.6 4.6v4.2h-4.2" />
    </>
  ),
  infinity: (
    <path d="M8.4 8.6a3.4 3.4 0 1 0 0 6.8c2.2 0 3-1.7 3.6-3.4.6-1.7 1.4-3.4 3.6-3.4a3.4 3.4 0 1 1 0 6.8c-2.2 0-3-1.7-3.6-3.4-.6-1.7-1.4-3.4-3.6-3.4Z" />
  ),
  chevronDown: <path d="m7 10 5 5 5-5" />,
  plus: <path d="M12 6.5v11M6.5 12h11" />,
  arrowLeft: (
    <>
      <path d="M19 12H5.5" />
      <path d="m11 6.5-5.5 5.5 5.5 5.5" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h13.5" />
      <path d="m13 6.5 5.5 5.5-5.5 5.5" />
    </>
  ),
  menu: <path d="M4.5 7.5h15M4.5 12h15M4.5 16.5h15" />,
  close: <path d="m6.8 6.8 10.4 10.4M17.2 6.8 6.8 17.2" />,
  apple: (
    <path
      fill="currentColor"
      stroke="none"
      d="M16.6 12.6c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.15-2.7.8-3.4.8s-1.8-.8-2.9-.78c-1.5.02-2.9.87-3.7 2.2-1.6 2.75-.4 6.8 1.1 9 .75 1.1 1.65 2.3 2.83 2.26 1.13-.05 1.56-.73 2.93-.73s1.76.73 2.95.7c1.22-.02 2-1.1 2.74-2.2.86-1.26 1.22-2.48 1.24-2.54-.03-.01-2.38-.91-2.4-3.61ZM14.4 5.9c.62-.75 1.04-1.8.92-2.84-.9.04-1.98.6-2.62 1.34-.57.66-1.07 1.72-.94 2.74 1 .08 2.02-.51 2.64-1.24Z"
    />
  ),
  play_store: (
    <path
      fill="currentColor"
      stroke="none"
      d="M3.9 2.6a1 1 0 0 0-.5.9v17a1 1 0 0 0 .5.9l9.3-9.4Zm10.7 8 2.6-2.6 3.5 2c.8.45.8 1.6 0 2.05l-3.5 2-2.6-2.6ZM4.9 1.9l9.9 5.65-2.3 2.3ZM4.9 22.1l7.6-7.95 2.3 2.3Z"
    />
  ),
  instagram: (
    <>
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5.2" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="16.9" cy="7.1" r="1.05" fill="currentColor" stroke="none" />
    </>
  ),
  x: (
    <path
      fill="currentColor"
      stroke="none"
      d="M17.2 3h3.1l-6.77 7.74L21.5 21h-6.23l-4.88-6.38L4.8 21H1.7l7.24-8.28L1.5 3h6.39l4.41 5.83Zm-1.09 16.14h1.72L7.03 4.77H5.19Z"
    />
  ),
  youtube: (
    <>
      <rect x="2.6" y="5.6" width="18.8" height="12.8" rx="4.2" />
      <path fill="currentColor" stroke="none" d="M10.4 9.3 15.2 12l-4.8 2.7Z" />
    </>
  ),
}

export default function Icon({ name, size = 20, className = '', strokeWidth = 1.7, ...rest }) {
  const glyph = paths[name]
  if (!glyph) return null

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {glyph}
    </svg>
  )
}

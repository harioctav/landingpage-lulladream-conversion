/** Tiny class-name joiner. Keeps conditional Tailwind lists readable. */
export default function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

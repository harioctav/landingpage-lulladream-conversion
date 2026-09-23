/**
 * Payment submission — the single integration point for the checkout.
 *
 * THIS IS A STUB. It never sends anything anywhere: no request is made, and
 * the card details are dropped on the floor once an outcome is chosen. It
 * exists so the three outcome pages can be built and tested.
 *
 * Replacing it with a real provider means more than filling in this function.
 * Raw card numbers must never reach your own server or this bundle: use the
 * provider's hosted fields (Stripe Elements, Braintree Hosted Fields, …) so
 * the number goes straight to them and this page only ever sees a token. The
 * card inputs in `Checkout.jsx` are placeholders for those fields, which is
 * also why `checkout.testMode` ships as `true`.
 *
 * Until then, these numbers force an outcome so every page can be checked:
 *   4000 0000 0000 0002 → failed (card_declined)
 *   5555 5555 5555 4444 → pending
 *   anything else that passes validation → success
 */
const OUTCOME_CARDS = {
  '4000000000000002': { status: 'failed', reason: 'card_declined' },
  '5555555555554444': { status: 'pending' },
}

const SIMULATED_LATENCY_MS = 1600

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** Short, human-readable, and safe to put in a URL or read down the phone. */
function reference() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6)
  const salt = Math.random().toString(36).toUpperCase().slice(2, 6)
  return `LD-${stamp}${salt}`
}

/**
 * @param {{ planId: string, account: { name: string, email: string }, card: { number: string } }} input
 * @returns {Promise<{ status: 'success'|'pending'|'failed', reference: string, reason?: string }>}
 */
export async function submitPayment({ card }) {
  const digits = String(card?.number ?? '').replace(/\D/g, '')
  await wait(SIMULATED_LATENCY_MS)
  return { ...(OUTCOME_CARDS[digits] ?? { status: 'success' }), reference: reference() }
}

/** Luhn check. Catches typos before the provider ever sees the number. */
export function isValidCardNumber(value) {
  const digits = String(value).replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return false
  let sum = 0
  let double = false
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i])
    if (double) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    double = !double
  }
  return sum % 10 === 0
}

/** `MM/YY`, and the month must not already be over. */
export function isValidExpiry(value) {
  const match = /^(\d{2})\s*\/\s*(\d{2})$/.exec(String(value).trim())
  if (!match) return { valid: false, past: false }
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return { valid: false, past: false }
  const now = new Date()
  const endOfMonth = new Date(year, month, 1).getTime()
  return { valid: true, past: endOfMonth <= now.getTime() }
}

/** 1234 5678 9012 3456 as you type; Amex groups 4-6-5. */
export function formatCardNumber(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 19)
  const amex = /^3[47]/.test(digits)
  const groups = amex ? [4, 6, 5] : [4, 4, 4, 4, 3]
  const out = []
  let at = 0
  for (const size of groups) {
    if (at >= digits.length) break
    out.push(digits.slice(at, at + size))
    at += size
  }
  return out.join(' ')
}

export function formatExpiry(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 4)
  return digits.length <= 2 ? digits : `${digits.slice(0, 2)}/${digits.slice(2)}`
}

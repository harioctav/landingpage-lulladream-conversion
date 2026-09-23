/**
 * Checkout and payment-outcome copy.
 *
 * `testMode` renders a visible notice and keeps `submitPayment` a simulation.
 * Turn it off only together with wiring a real payment provider — a form that
 * looks live but goes nowhere would collect real card numbers from real
 * parents.
 */
export const checkout = {
  testMode: true,
  testNotice:
    'Test mode — nothing is charged and no card details leave this page.',

  title: 'Complete your subscription',
  back: { label: 'Back to plans', href: '../#pricing' },
  changePlan: { label: 'Change plan', href: '../#pricing' },
  fallbackPlanId: 'super-monthly',

  summary: {
    heading: 'Your plan',
    dueToday: 'Due today',
    thenNote: 'Then',
    wasLabel: 'Was',
  },

  account: {
    heading: 'Create your account',
    note: 'These are the details you will sign in with.',
    name: {
      label: 'Full name',
      placeholder: 'Jane Cooper',
      autoComplete: 'name',
      max: 80,
    },
    email: {
      label: 'Email address',
      placeholder: 'you@example.com',
      autoComplete: 'email',
      max: 120,
    },
    password: {
      label: 'Password',
      placeholder: 'At least 8 characters',
      autoComplete: 'new-password',
      min: 8,
      max: 72,
      hint: 'At least 8 characters.',
      show: 'Show password',
      hide: 'Hide password',
    },
  },

  payment: {
    heading: 'Payment',
    methodName: 'Credit card',
    methodNote: 'Visa, Mastercard and American Express.',
    methodOnly: 'Credit card is the only payment method for this plan.',
    cardName: {
      label: 'Name on card',
      placeholder: 'Jane Cooper',
      autoComplete: 'cc-name',
      max: 80,
    },
    cardNumber: {
      label: 'Card number',
      placeholder: '1234 5678 9012 3456',
      autoComplete: 'cc-number',
    },
    expiry: {
      label: 'Expiry date',
      placeholder: 'MM/YY',
      autoComplete: 'cc-exp',
    },
    cvc: {
      label: 'Security code',
      placeholder: '123',
      autoComplete: 'cc-csc',
      hint: '3 digits on the back of the card, 4 on the front for Amex.',
    },
  },

  submit: 'Pay and start my plan',
  submitTrial: 'Start my 7-day free trial',
  processing: 'Processing…',

  errorSummary: 'Check the details below and try again.',
  errors: {
    name: 'Enter the name on the account.',
    email: 'Enter a valid email address.',
    password: 'Use at least 8 characters.',
    cardName: 'Enter the name printed on the card.',
    cardNumber: 'Enter a valid card number.',
    expiry: 'Enter the expiry date as MM/YY.',
    expiryPast: 'That expiry date has passed.',
    cvc: 'Enter the 3 or 4 digit security code.',
    unknown: 'Something went wrong. No payment was taken — please try again.',
  },

  trust: [
    { icon: 'lock', label: 'Encrypted checkout' },
    { icon: 'refresh', label: 'Cancel any time' },
    { icon: 'shield', label: '30-day money-back guarantee' },
  ],

  /* ---- Outcome pages ---------------------------------------------------- */
  statuses: {
    success: {
      icon: 'check',
      eyebrow: 'Payment successful',
      title: 'You’re all set — bedtime just got easier',
      body: 'Your subscription is active and a receipt is on its way to your inbox. Open the app and make tonight’s story.',
      cta: { label: 'Open LullaDream', href: 'https://app.lulladream.ai/' },
      secondary: { label: 'Back to the site', href: '../../' },
      note: 'Signed in with the email you just used.',
      refLabel: 'Payment reference',
    },
    pending: {
      icon: 'clock',
      eyebrow: 'Payment pending',
      title: 'Your bank is still confirming this payment',
      body: 'This usually takes a few minutes. We’ll email you the moment it clears, and your plan starts automatically — there is nothing else to do and you will not be charged twice.',
      cta: { label: 'Back to the site', href: '../../' },
      secondary: { label: 'Contact support', href: 'mailto:hello@lulladream.ai' },
      note: 'Keep this reference if you need to contact us.',
      refLabel: 'Payment reference',
    },
    failed: {
      icon: 'alert',
      eyebrow: 'Payment failed',
      title: 'That payment didn’t go through',
      body: 'No money has been taken. This is usually the bank declining the card — check the details, or try a different card.',
      cta: { label: 'Try again', href: '../' },
      secondary: { label: 'Contact support', href: 'mailto:hello@lulladream.ai' },
      note: 'Nothing was charged.',
      refLabel: 'Reason',
      reasons: {
        card_declined: 'The card was declined by the bank.',
        expired_card: 'That card has expired.',
        insufficient_funds: 'There were not enough funds on the card.',
        processing_error: 'The payment provider could not process the card.',
      },
    },
  },
}

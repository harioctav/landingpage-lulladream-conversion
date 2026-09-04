import { avatars, covers, photos } from '@/lib/assets'

export const site = {
  name: 'LullaDream',
  tagline: 'AI bedtime stories, personalised for your child',
}

export const nav = {
  links: [
    { label: 'What you unlock', href: '#compare' },
    { label: 'Plans', href: '#pricing' },
    { label: 'Guarantee', href: '#guarantee' },
  ],
  cta: { label: 'Unlock Unlimited Stories', href: '#pricing' },
}

/* ---------------------------------------------------------------------------
   1 — HERO
   Loss aversion first: the trial is what is ending, not a feature that is
   missing. One primary CTA only; a second button here costs conversions.
   ------------------------------------------------------------------------ */
export const hero = {
  eyebrow: 'Your free trial is almost over',
  title: ['Don’t Let Tonight’s Story', 'Be the Last One'],
  body: 'Unlock unlimited personalised stories, every voice style, and offline downloads for road trips and flights.',
  cta: { label: 'Unlock Unlimited Stories', href: '#pricing' },
  reassurance: 'Cancel any time · 30-day money-back guarantee · Keeps every story you’ve made',
  image: {
    src: covers.cover4,
    alt: 'Cover art from Phra Aphai Mani: the prince plays his magic flute on the shore as a sea ogress rises from the waves and mermaids look on',
  },
  // The urgency card floating over the hero photo.
  trial: {
    label: 'Your trial',
    remaining: '2 stories left',
    note: 'Then bedtime goes quiet until you upgrade.',
    used: 7,
    total: 9,
    usedLabel: '7 of 9 free stories used',
  },
  stats: [
    { value: '4.9★', label: 'App Store rating' },
    { value: '2,400+', label: 'Parents subscribed' },
    { value: '30 days', label: 'Money-back guarantee' },
  ],
}

/* ---------------------------------------------------------------------------
   2 — FREE vs PREMIUM
   ------------------------------------------------------------------------ */
export const comparison = {
  eyebrow: 'Free vs Premium',
  title: 'What changes the night you upgrade',
  body: 'You have already heard what LullaDream sounds like. Here is everything the free plan keeps behind the curtain.',
  columns: {
    free: { name: 'Free plan', note: 'What you have now', price: '3 stories / week' },
    premium: {
      name: 'Premium',
      note: 'Most popular',
      price: 'Unlimited, every night',
    },
  },
  rows: [
    { label: 'Stories', free: '3 per week', premium: 'Unlimited — a new one every night', highlight: true },
    { label: 'Personalisation', free: 'Child’s name only', premium: 'Name, friends, pets, favourite worlds' },
    { label: 'Narrator voices', free: '1 standard voice', premium: 'Every voice style, including your own cloned voice', highlight: true },
    { label: 'Offline downloads', free: false, premium: 'Road trips, flights, patchy Wi-Fi', highlight: true },
    { label: 'Story library', free: 'Last 5 stories', premium: 'Saved forever, replay any night' },
    { label: 'Children per account', free: '1 child', premium: 'Up to 4 children' },
    { label: 'New themes each month', free: false, premium: 'First access, every month' },
    { label: 'Support', free: 'Help centre', premium: 'Priority replies within a day' },
  ],
  cta: { label: 'Keep the Magic — Upgrade Now', href: '#pricing' },
}

/* ---------------------------------------------------------------------------
   3 — PRICING
   The featured quote sits directly above the table, per the brief.
   ------------------------------------------------------------------------ */
export const pricing = {
  eyebrow: 'Choose your plan',
  title: 'Less than one bedtime book, every month',
  body: 'One picture book at the shop costs more than a whole month of unlimited stories. Pick the plan that fits, change or cancel it whenever you like.',
  featuredQuote: {
    quote:
      'We upgraded the night our free stories ran out. My son asks for LullaDream every single night now — he even names the characters before we start.',
    name: 'Amara R.',
    role: 'Parent of a 4-year-old · Premium since March',
    avatar: avatars.avatar1,
  },
  plans: [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$9.99',
      unit: '/ month',
      summary: 'Full Premium, month to month.',
      note: 'Billed monthly. Cancel any time.',
      cta: { label: 'Start My Premium Plan', href: '#checkout' },
      variant: 'outline',
      features: [
        'Unlimited personalised stories',
        'Every narrator voice + your own voice',
        'Offline downloads',
        'Up to 4 children',
      ],
    },
    {
      id: 'annual',
      name: 'Annual',
      badge: 'Most popular',
      price: '$4.99',
      unit: '/ month',
      billed: 'Billed $59.88 once a year',
      save: 'Save 50%',
      summary: 'Two nights of stories a month pays for it.',
      note: '30-day money-back guarantee. Cancel any time.',
      cta: { label: 'Unlock Unlimited Stories', href: '#checkout' },
      variant: 'primary',
      features: [
        'Everything in Monthly',
        'Two months free vs. paying monthly',
        'First access to new themes',
        'Priority support',
      ],
    },
  ],
  anchor: 'That’s less than one bedtime book at the store — for a new story every night.',
  reassurance: 'Cancel any time · Secure checkout · Money back within 30 days',
}

/* ---------------------------------------------------------------------------
   4 — TESTIMONIAL / TRUST
   ------------------------------------------------------------------------ */
export const proof = {
  rating: { score: '4.9', outOf: '5', count: '2,400+' },
  title: 'Parents who upgraded, in their own words',
  badges: [
    { icon: 'lock', label: 'Secure checkout', note: 'Encrypted, PCI-compliant' },
    { icon: 'refresh', label: 'Cancel any time', note: 'One tap in settings' },
    { icon: 'star', label: '4.9 on the App Store', note: 'From 2,400+ parents' },
  ],
  quotes: [
    {
      quote:
        'The three free stories a week were never enough. Now there is a new one every night and she still asks for the same voice.',
      name: 'Priya S.',
      role: 'Premium · Parent of a 3-year-old',
      avatar: avatars.avatar3,
    },
    {
      quote:
        'I travel most weeks. Hearing my own cloned voice read to him while I am in another city is worth far more than five dollars a month.',
      name: 'Daniel K.',
      role: 'Premium · Parent of a 5-year-old',
      avatar: avatars.avatar2,
    },
    {
      quote:
        'We downloaded eight stories before a nine-hour flight. Not one meltdown. That alone paid for the year.',
      name: 'Tomas B.',
      role: 'Premium · Parent of twins, age 6',
      avatar: avatars.avatar4,
    },
    {
      quote:
        'I cancelled two other subscriptions to keep this one. It is the only part of the evening nobody argues about.',
      name: 'Grace O.',
      role: 'Premium · Parent of a 4-year-old',
      avatar: avatars.avatar5,
    },
    {
      quote:
        'Upgrading took thirty seconds and every story we made during the trial was still there. That mattered to her more than to me.',
      name: 'Amara R.',
      role: 'Premium · Parent of a 4-year-old',
      avatar: avatars.avatar1,
    },
  ],
}

/* ---------------------------------------------------------------------------
   5 — GUARANTEE
   ------------------------------------------------------------------------ */
export const guarantee = {
  eyebrow: 'Nothing to lose',
  title: 'Try Premium for a month. If bedtime isn’t easier, we’ll refund it.',
  body: 'No forms, no phone call, no “are you sure?” loop. Email us within 30 days and you get every penny back — and the stories you already made stay in your library either way.',
  points: [
    {
      icon: 'shield',
      title: '30-day money-back guarantee',
      body: 'One email is enough. Full refund, no questions about why.',
    },
    {
      icon: 'refresh',
      title: 'Cancel in one tap',
      body: 'Settings → Plan → Cancel. No retention maze, no hold music.',
    },
    {
      icon: 'lock',
      title: 'Secure checkout',
      body: 'Payments handled by an encrypted, PCI-compliant provider. We never see your card.',
    },
    {
      icon: 'download',
      title: 'Your stories stay yours',
      body: 'Everything you made during the trial is kept, downloadable, and never deleted.',
    },
  ],
  image: {
    src: photos.restingChild,
    alt: 'A parent and child reading together on the sofa at the end of the day',
  },
}

/* ---------------------------------------------------------------------------
   6 — FINAL CTA
   `expiresInHours` drives the countdown — set it from the user's real trial
   end date when this page is wired to the app.
   ------------------------------------------------------------------------ */
export const finalCta = {
  eyebrow: 'Trial ending',
  title: 'Keep the magic going tonight',
  body: 'When the countdown hits zero your free stories stop. Upgrade now and tonight’s story plays exactly like the last one did.',
  expiresInHours: 48,
  countdownLabel: 'Your free stories end in',
  cta: { label: 'Unlock Unlimited Stories', href: '#pricing' },
  secondary: 'From $4.99 / month · Cancel any time · 30-day money-back guarantee',
}

export const footer = {
  columns: [
    {
      title: 'Upgrade',
      links: [
        { label: 'What you unlock', href: '#compare' },
        { label: 'Plans & pricing', href: '#pricing' },
        { label: 'Guarantee', href: '#guarantee' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Contact', href: 'mailto:hello@lulladream.ai' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy policy', href: '#' },
        { label: 'Terms of service', href: '#' },
        { label: 'Billing & refunds', href: '#' },
      ],
    },
  ],
  socials: [
    { label: 'Instagram', icon: 'instagram', href: '#' },
    { label: 'X', icon: 'x', href: '#' },
    { label: 'YouTube', icon: 'youtube', href: '#' },
  ],
  copyright: '© 2025 LullaDream. All rights reserved.',
}

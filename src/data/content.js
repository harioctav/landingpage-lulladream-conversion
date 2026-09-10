import { avatars, covers, photos } from "@/lib/assets";

export const site = {
  name: "LullaDream",
  tagline: "AI bedtime stories, personalised for your child",
};

/* ---------------------------------------------------------------------------
   DESTINATIONS
   Every outbound CTA resolves here, so the story builder and the checkout can
   be re-pointed in one edit.

   `createStory` is the animal-story builder that ships in this repo
   (create/index.html). It is relative rather than root-absolute, so the site
   still works if it is deployed under a sub-path. Point it at the app instead
   once the app accepts a pre-filled animal story.
   ------------------------------------------------------------------------ */
export const links = {
  createStory: "./create/",
  checkout: "#checkout",
};

export const nav = {
  links: [
    { label: "What you unlock", href: "#compare" },
    { label: "Plans", href: "#pricing" },
    { label: "Guarantee", href: "#guarantee" },
  ],
  cta: { label: "Create Their Story", href: links.createStory },
};

/* ---------------------------------------------------------------------------
   PROMO
   `endsAt` is the single source of truth for every countdown on the page —
   the top bar and the final CTA both read it. Set it to the real campaign
   deadline; it is an ISO timestamp with an explicit offset so it means the
   same moment for a parent in Jakarta and one in Singapore.
   ------------------------------------------------------------------------ */
export const promo = {
  badge: "58% OFF",
  plan: "Super Premium",
  headline: "Super Premium is 58% off",
  sub: "Instagram readers only — the animal-story plan, at less than a coffee a month.",
  note: "Offer ends in",
  endsAt: "2026-09-30T23:59:59+07:00",
  cta: { label: "See the offer", href: "#pricing" },
  expired: "This offer has closed — current pricing is below.",
};

/* ---------------------------------------------------------------------------
   1 — HERO
   Campaign traffic arrives from the "what your child's favourite animal says
   about them" post, so the hero picks that thread straight up and explains
   what LullaDream does with it. Nothing is filled in here: the single CTA
   leads to the builder, where the story is actually made.
   ------------------------------------------------------------------------ */
export const hero = {
  eyebrow: "From our favourite-animal post",
  title: ["Their Favourite Animal,", "Tonight’s Bedtime Hero"],
  body: "You found out what their favourite animal says about them. Tell LullaDream which one it is — lion, puppy, T-Rex — and we write tonight’s story around it, with your child’s name in it and read in your own voice.",
  cta: { label: "Create Their Animal Story", href: links.createStory },
  reassurance:
    "Cancel any time · 7-day free trial on Super Premium · Works offline",
  image: {
    src: covers.cover4,
    alt: "Cover art from a LullaDream story: a young hero playing a magic flute on the shore as a sea creature rises from the waves",
  },
  stats: [
    { value: "4.9★", label: "App Store rating" },
    { value: "2,400+", label: "Parents subscribed" },
    { value: "58%", label: "Off Super Premium" },
  ],
};

/* ---------------------------------------------------------------------------
   2 — FREE vs PREMIUM vs SUPER PREMIUM
   Three columns, because the page now sells two paid tiers and the thing the
   campaign promises — the animal story in your own cloned voice — only exists
   on the top one.
   ------------------------------------------------------------------------ */
export const comparison = {
  eyebrow: "Premium or Super Premium",
  title: "Both write the animal stories. One writes them in your voice.",
  body: "Every paid plan gives unlimited stories around whatever animal your child names. The difference is how far you can take it.",
  columns: {
    premium: {
      name: "Premium",
      note: "Unlimited stories",
      price: "From USD 2.28 / month",
    },
    superPremium: {
      name: "Super Premium",
      note: "Best value · 58% off",
      price: "7 days free, then USD 3.99 / month",
    },
  },
  rows: [
    {
      label: "Animal stories",
      premium: "Unlimited, any animal they name",
      superPremium: "Unlimited, any animal they name",
    },
    {
      label: "Personalisation",
      premium: "Name, favourite animal, friends, pets",
      superPremium: "Name, favourite animal, friends, pets",
    },
    {
      label: "Narrator voices",
      premium: "Unlimited voice templates",
      superPremium: "Unlimited voice templates",
    },
    {
      label: "Voice cloning — your own voice",
      premium: false,
      superPremium: "Included. Bedtime still sounds like you.",
      highlight: true,
    },
    {
      label: "Coins for custom stories",
      premium: "100 / month · 1,200 / year",
      superPremium: "400 / month · 4,800 / year",
      highlight: true,
    },
    {
      label: "Free trial",
      premium: false,
      superPremium: "7 days free, cancel any time",
      highlight: true,
    },
    {
      label: "Offline downloads",
      premium: "Road trips, flights, patchy Wi-Fi",
      superPremium: "Road trips, flights, patchy Wi-Fi",
    },
    {
      label: "Story library",
      premium: "Saved forever, replay any night",
      superPremium: "Saved forever, replay any night",
    },
    {
      label: "Children per account",
      premium: "Up to 4 children",
      superPremium: "Up to 4 children",
    },
    {
      label: "Support",
      premium: "Priority replies within a day",
      superPremium: "Priority replies within a day",
    },
  ],
  cta: { label: "Unlock Super Premium", href: "#pricing" },
};

/* ---------------------------------------------------------------------------
   3 — PRICING
   Mirrors the plan sheet in the app: a Monthly/Yearly switch over two cards,
   each with its discount badge, struck-through list price and coin allowance.
   Every figure here must match what checkout actually charges.
   ------------------------------------------------------------------------ */
export const pricing = {
  eyebrow: "Choose your plan",
  title: "Less than one bedtime book, every month",
  body: "One picture book at the shop costs more than a month of unlimited stories. Discounts below are part of the Instagram campaign and end with the countdown.",
  featuredQuote: {
    quote:
      "She picked the lion. Ten minutes later she was hearing a story about a lion with her own name in it, in my voice. She has asked for LullaDream every night since.",
    name: "Amara R.",
    role: "Parent of a 4-year-old · Super Premium",
    avatar: avatars.avatar1,
  },
  cycles: [
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ],
  cycleLabel: "Billing period",
  plans: {
    monthly: [
      {
        id: "premium-monthly",
        name: "Premium",
        discount: "55% OFF",
        was: "USD 5.13",
        price: "USD 2.28",
        unit: "/ month",
        summary:
          "Unlock the full story library and create magical bedtime stories for your child.",
        features: [
          { strong: "Unlimited", text: "bedtime stories" },
          { strong: "Unlimited", text: "voice templates" },
          { strong: "Get 100 coins", text: "to create custom stories" },
        ],
        cta: { label: "Start My Premium Plan", href: links.checkout },
        note: "Billed monthly. Cancel any time.",
      },
      {
        id: "super-monthly",
        name: "Super Premium",
        badge: "Best value",
        discount: "58% OFF",
        trial: "7-day free trial",
        was: "USD 9.69",
        price: "USD 0.00",
        then: "Then USD 3.99 / month. Cancel any time.",
        summary:
          "Take storytelling to the next level with full creative control.",
        features: [
          { strong: "Includes", text: "all Premium features" },
          {
            pill: "Exclusive",
            strong: "Get 400 coins",
            text: "to create custom stories and clone your voice",
          },
        ],
        cta: { label: "Start My 7-Day Free Trial", href: links.checkout },
        note: "Nothing charged today. 30-day money-back guarantee after that.",
        featured: true,
      },
    ],
    yearly: [
      {
        id: "premium-yearly",
        name: "Premium",
        discount: "54% OFF",
        was: "USD 57.00",
        price: "USD 26.22",
        unit: "/ year",
        summary:
          "Unlock the full story library and create magical bedtime stories for your child.",
        features: [
          { strong: "Unlimited", text: "bedtime stories" },
          { strong: "Unlimited", text: "voice templates" },
          { strong: "Get 1,200 coins", text: "to create custom stories" },
        ],
        cta: { label: "Start My Premium Plan", href: links.checkout },
        note: "Billed once a year. Cancel any time.",
      },
      {
        id: "super-yearly",
        name: "Super Premium",
        badge: "Best value",
        discount: "58% OFF",
        was: "USD 114.00",
        price: "USD 47.31",
        unit: "/ year",
        summary:
          "Take storytelling to the next level with full creative control.",
        features: [
          { strong: "Includes", text: "all Premium features" },
          {
            pill: "Exclusive",
            strong: "Get 4,800 coins",
            text: "to create custom stories and clone your voice",
          },
        ],
        cta: { label: "Unlock Super Premium", href: links.checkout },
        note: "Billed once a year. 30-day money-back guarantee.",
        featured: true,
      },
    ],
  },
  anchor:
    "That’s less than one bedtime book at the store — for a new story every night.",
  reassurance: "Cancel any time · Secure checkout · Money back within 30 days",
};

/* ---------------------------------------------------------------------------
   4 — TESTIMONIAL / TRUST
   ------------------------------------------------------------------------ */
export const proof = {
  rating: { score: "4.9", outOf: "5", count: "2,400+" },
  title: "Parents who upgraded, in their own words",
  badges: [
    {
      icon: "lock",
      label: "Secure checkout",
      note: "Encrypted, PCI-compliant",
    },
    { icon: "refresh", label: "Cancel any time", note: "One tap in settings" },
    {
      icon: "star",
      label: "4.9 on the App Store",
      note: "From 2,400+ parents",
    },
  ],
  quotes: [
    {
      quote:
        "He chose the T-Rex, of course. Hearing a dinosaur story with his name in it — and mine reading it — beat every book on the shelf.",
      name: "Priya S.",
      role: "Super Premium · Parent of a 3-year-old",
      avatar: avatars.avatar3,
    },
    {
      quote:
        "I travel most weeks. Hearing my own cloned voice read to him while I am in another city is worth far more than four dollars a month.",
      name: "Daniel K.",
      role: "Super Premium · Parent of a 5-year-old",
      avatar: avatars.avatar2,
    },
    {
      quote:
        "We downloaded eight animal stories before a nine-hour flight. Not one meltdown. That alone paid for the year.",
      name: "Tomas B.",
      role: "Premium · Parent of twins, age 6",
      avatar: avatars.avatar4,
    },
    {
      quote:
        "She wanted a different animal every night — a rabbit, then a whale, then a rabbit again. Premium keeps up with her; nothing else did.",
      name: "Grace O.",
      role: "Premium · Parent of a 4-year-old",
      avatar: avatars.avatar5,
    },
    {
      quote:
        "Every story we made during the trial was still there after we subscribed. That mattered to her more than to me.",
      name: "Amara R.",
      role: "Super Premium · Parent of a 4-year-old",
      avatar: avatars.avatar1,
    },
  ],
};

/* ---------------------------------------------------------------------------
   5 — GUARANTEE
   ------------------------------------------------------------------------ */
export const guarantee = {
  eyebrow: "Nothing to lose",
  title: "Start free. If bedtime isn’t easier, we’ll refund it.",
  body: "Super Premium starts with seven free days — nothing is charged until they are over. After that, email us within 30 days and you get every penny back, and the stories you already made stay in your library either way.",
  points: [
    {
      icon: "sparkle",
      title: "7 days free on Super Premium",
      body: "Full creative control, voice cloning included. Nothing charged today.",
    },
    {
      icon: "shield",
      title: "30-day money-back guarantee",
      body: "One email is enough. Full refund, no questions about why.",
    },
    {
      icon: "refresh",
      title: "Cancel in one tap",
      body: "Settings → Plan → Cancel. No retention maze, no hold music.",
    },
    {
      icon: "lock",
      title: "Secure checkout",
      body: "Payments handled by an encrypted, PCI-compliant provider. We never see your card.",
    },
  ],
  image: {
    src: photos.restingChild,
    alt: "A parent and child reading together on the sofa at the end of the day",
  },
};

/* ---------------------------------------------------------------------------
   6 — FINAL CTA
   ------------------------------------------------------------------------ */
export const finalCta = {
  eyebrow: "Campaign offer",
  title: "Pick their animal. We’ll write the rest.",
  body: "Super Premium is 58% off until the countdown runs out — unlimited animal stories, your own cloned voice, and seven days free before anything is charged.",
  countdownLabel: "Offer ends in",
  cta: { label: "Start My 7-Day Free Trial", href: "#pricing" },
  secondary:
    "Then USD 3.99 / month · Cancel any time · 30-day money-back guarantee",
  expired:
    "This campaign offer has closed. Current pricing is in the plans above.",
};

export const footer = {
  columns: [
    {
      title: "Upgrade",
      links: [
        { label: "What you unlock", href: "#compare" },
        { label: "Plans & pricing", href: "#pricing" },
        { label: "Guarantee", href: "#guarantee" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Press", href: "#" },
        { label: "Contact", href: "mailto:hello@lulladream.ai" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: "#" },
        { label: "Terms of service", href: "#" },
        { label: "Billing & refunds", href: "#" },
      ],
    },
  ],
  socials: [
    {
      label: "Instagram",
      icon: "instagram",
      href: "https://www.instagram.com/lulladream.ai/",
    },
    { label: "X", icon: "x", href: "#" },
    { label: "YouTube", icon: "youtube", href: "#" },
  ],
  copyright: "© 2026 LullaDream. All rights reserved.",
};

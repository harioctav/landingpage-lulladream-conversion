import { useId, useRef, useState } from 'react'
import { checkout } from '@/data/checkout'
import { pricing, promo } from '@/data/content'
import {
  formatCardNumber,
  formatExpiry,
  isValidCardNumber,
  isValidExpiry,
  submitPayment,
} from '@/lib/payment'
import cx from '@/lib/cx'
import Button from '@/components/ui/Button'
import Countdown from '@/components/ui/Countdown'
import Icon from '@/components/ui/Icon'
import Logo from '@/components/ui/Logo'
import PlanCard from '@/components/ui/PlanCard'

/**
 * Checkout: account details plus a credit card, for one plan.
 *
 * The card inputs are placeholders for a payment provider's hosted fields —
 * see `src/lib/payment.js`. Nothing here is submitted anywhere while
 * `checkout.testMode` is on, and the notice at the top says so.
 */
const plans = [...pricing.plans.monthly, ...pricing.plans.yearly]

function planFromUrl() {
  const wanted = new URLSearchParams(window.location.search).get('plan')
  return (
    plans.find((p) => p.id === wanted) ??
    plans.find((p) => p.id === checkout.fallbackPlanId) ??
    plans[0]
  )
}

const inputClass = cx(
  'min-h-12 w-full rounded-sm border bg-surface-base px-s5 text-md text-text-primary shadow-1',
  'placeholder:text-text-muted transition-colors duration-150 hover:border-text-primary focus:border-action-primary',
)

function Field({ id, label, hint, error, children }) {
  return (
    <div className="flex flex-col gap-s3">
      <label htmlFor={id} className="text-md font-semibold text-text-primary">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-s2 text-sm font-medium text-[#8a1111]">
          <Icon name="alert" size={15} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

export default function Checkout() {
  const [plan] = useState(planFromUrl)
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const formRef = useRef(null)
  const ids = {
    name: useId(),
    email: useId(),
    password: useId(),
    cardName: useId(),
    cardNumber: useId(),
    expiry: useId(),
    cvc: useId(),
  }
  const [showPassword, setShowPassword] = useState(false)

  const set = (key) => (event) => {
    const raw = event.target.value
    const value =
      key === 'cardNumber'
        ? formatCardNumber(raw)
        : key === 'expiry'
          ? formatExpiry(raw)
          : key === 'cvc'
            ? raw.replace(/\D/g, '').slice(0, 4)
            : raw
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }

  function validate() {
    const e = {}
    const t = checkout.errors
    if (values.name.trim().length < 2) e.name = t.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) e.email = t.email
    if (values.password.length < checkout.account.password.min) e.password = t.password
    if (values.cardName.trim().length < 2) e.cardName = t.cardName
    if (!isValidCardNumber(values.cardNumber)) e.cardNumber = t.cardNumber
    const expiry = isValidExpiry(values.expiry)
    if (!expiry.valid) e.expiry = t.expiry
    else if (expiry.past) e.expiry = t.expiryPast
    if (!/^\d{3,4}$/.test(values.cvc)) e.cvc = t.cvc
    return e
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting) return

    const found = validate()
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      setFormError(null)
      // Send focus to the field that needs fixing, not just a message.
      formRef.current?.querySelector(`#${CSS.escape(ids[firstInvalid])}`)?.focus()
      return
    }

    setSubmitting(true)
    setFormError(null)
    try {
      const result = await submitPayment({
        planId: plan.id,
        account: { name: values.name.trim(), email: values.email.trim() },
        card: { number: values.cardNumber },
      })
      const ref = encodeURIComponent(result.reference)
      if (result.status === 'success') window.location.assign(`./success/?ref=${ref}`)
      else if (result.status === 'pending') window.location.assign(`./pending/?ref=${ref}`)
      else
        window.location.assign(
          `./failed/?reason=${encodeURIComponent(result.reason ?? 'processing_error')}&plan=${encodeURIComponent(plan.id)}`,
        )
    } catch {
      setFormError(checkout.errors.unknown)
      setSubmitting(false)
    }
  }

  const describedBy = (key, hint) =>
    errors[key] ? `${ids[key]}-error` : hint ? `${ids[key]}-hint` : undefined
  const borderFor = (key) => (errors[key] ? 'border-[#8a1111]' : 'border-border-strong')

  return (
    <div className="min-h-svh bg-surface-raised">
      <div className="mx-auto w-full max-w-5xl px-s6 pb-16 pt-s7 sm:px-8 sm:pt-10">
        <a
          href={checkout.back.href}
          aria-label="LullaDream — back to plans"
          className="flex justify-center rounded-sm"
        >
          <Logo className="h-11 self-center sm:h-12" />
        </a>

        <div className="mt-s7 flex flex-col items-center gap-s4 text-center">
          <h1 className="flex items-center gap-s3 text-d3 text-text-primary sm:text-d2">
            <Icon name="lock" size={26} className="shrink-0 text-action-primary" />
            {checkout.title}
          </h1>
          <a
            href={checkout.back.href}
            className="inline-flex items-center gap-s3 rounded-full text-sm font-semibold text-action-primary-active underline underline-offset-4 transition-colors duration-150 hover:text-action-primary-hover"
          >
            <Icon name="arrowLeft" size={16} />
            {checkout.back.label}
          </a>
        </div>

        {checkout.testMode && (
          <p className="mx-auto mt-s7 flex max-w-2xl items-start gap-s3 rounded-md border border-sun-400 bg-sun-300/40 px-s5 py-s4 text-sm text-ink-900">
            <Icon name="alert" size={16} className="mt-0.5 shrink-0" />
            <span>
              <strong className="font-bold">{checkout.testNotice}</strong> Card 4242 4242 4242 4242
              succeeds, 4000 0000 0000 0002 fails, 5555 5555 5555 4444 stays pending.
            </span>
          </p>
        )}

        <div className="mt-s8 grid items-start gap-s7 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8">
          {/* Left card: the form. Right card: the plan they picked, rendered
              by the same component as the pricing section, so it looks like
              the card they clicked. On phones the plan comes first — what you
              are buying, before what you have to type. */}
          <div className="rounded-xl border border-border-default bg-surface-base p-s8 shadow-2 max-sm:p-s5">
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-s8">
              {formError && (
                <p
                  role="alert"
                  className="rounded-md border border-[#ffbcbc] bg-[#ffe3e3] px-s5 py-s4 text-sm text-[#8a1111]"
                >
                  {formError}
                </p>
              )}

              <fieldset className="flex flex-col gap-s6">
                <legend className="text-lg font-bold text-text-primary">
                  {checkout.account.heading}
                </legend>
                <p className="text-sm text-text-muted">{checkout.account.note}</p>

                <Field id={ids.name} label={checkout.account.name.label} error={errors.name}>
                  <input
                    id={ids.name}
                    type="text"
                    value={values.name}
                    onChange={set('name')}
                    placeholder={checkout.account.name.placeholder}
                    autoComplete={checkout.account.name.autoComplete}
                    maxLength={checkout.account.name.max}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy('name')}
                    className={cx(inputClass, borderFor('name'))}
                  />
                </Field>

                <Field id={ids.email} label={checkout.account.email.label} error={errors.email}>
                  <input
                    id={ids.email}
                    type="email"
                    value={values.email}
                    onChange={set('email')}
                    placeholder={checkout.account.email.placeholder}
                    autoComplete={checkout.account.email.autoComplete}
                    maxLength={checkout.account.email.max}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy('email')}
                    className={cx(inputClass, borderFor('email'))}
                  />
                </Field>

                <Field
                  id={ids.password}
                  label={checkout.account.password.label}
                  hint={checkout.account.password.hint}
                  error={errors.password}
                >
                  <span className="relative flex">
                    <input
                      id={ids.password}
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={set('password')}
                      placeholder={checkout.account.password.placeholder}
                      autoComplete={checkout.account.password.autoComplete}
                      maxLength={checkout.account.password.max}
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={describedBy('password', checkout.account.password.hint)}
                      className={cx(inputClass, borderFor('password'), 'pr-14')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-pressed={showPassword}
                      aria-label={
                        showPassword ? checkout.account.password.hide : checkout.account.password.show
                      }
                      className="absolute right-s2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-text-muted transition-colors duration-150 hover:bg-surface-raised hover:text-text-primary"
                    >
                      <Icon name={showPassword ? 'eyeOff' : 'eye'} size={20} />
                    </button>
                  </span>
                </Field>
              </fieldset>

              <fieldset className="flex flex-col gap-s6">
                <legend className="text-lg font-bold text-text-primary">
                  {checkout.payment.heading}
                </legend>

                {/* One method, so this states it rather than pretending to be
                    a choice between several. */}
                <p className="flex items-center gap-s4 rounded-md border border-action-primary bg-dream-100/50 px-s5 py-s4">
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-action-primary text-white"
                  >
                    <Icon name="creditCard" size={20} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-md font-semibold text-text-primary">
                      {checkout.payment.methodName}
                    </span>
                    <span className="text-sm text-text-muted">{checkout.payment.methodNote}</span>
                  </span>
                </p>

                <Field
                  id={ids.cardName}
                  label={checkout.payment.cardName.label}
                  error={errors.cardName}
                >
                  <input
                    id={ids.cardName}
                    type="text"
                    value={values.cardName}
                    onChange={set('cardName')}
                    placeholder={checkout.payment.cardName.placeholder}
                    autoComplete={checkout.payment.cardName.autoComplete}
                    maxLength={checkout.payment.cardName.max}
                    aria-invalid={Boolean(errors.cardName)}
                    aria-describedby={describedBy('cardName')}
                    className={cx(inputClass, borderFor('cardName'))}
                  />
                </Field>

                <Field
                  id={ids.cardNumber}
                  label={checkout.payment.cardNumber.label}
                  error={errors.cardNumber}
                >
                  <span className="relative flex">
                    <input
                      id={ids.cardNumber}
                      type="text"
                      inputMode="numeric"
                      value={values.cardNumber}
                      onChange={set('cardNumber')}
                      placeholder={checkout.payment.cardNumber.placeholder}
                      autoComplete={checkout.payment.cardNumber.autoComplete}
                      maxLength={23}
                      aria-invalid={Boolean(errors.cardNumber)}
                      aria-describedby={describedBy('cardNumber')}
                      className={cx(inputClass, borderFor('cardNumber'), 'pr-12')}
                    />
                    <Icon
                      name="creditCard"
                      size={20}
                      className="pointer-events-none absolute right-s5 top-1/2 -translate-y-1/2 text-text-faint"
                    />
                  </span>
                </Field>

                <div className="grid grid-cols-2 gap-s5">
                  <Field id={ids.expiry} label={checkout.payment.expiry.label} error={errors.expiry}>
                    <input
                      id={ids.expiry}
                      type="text"
                      inputMode="numeric"
                      value={values.expiry}
                      onChange={set('expiry')}
                      placeholder={checkout.payment.expiry.placeholder}
                      autoComplete={checkout.payment.expiry.autoComplete}
                      maxLength={5}
                      aria-invalid={Boolean(errors.expiry)}
                      aria-describedby={describedBy('expiry')}
                      className={cx(inputClass, borderFor('expiry'))}
                    />
                  </Field>

                  <Field
                    id={ids.cvc}
                    label={checkout.payment.cvc.label}
                    hint={checkout.payment.cvc.hint}
                    error={errors.cvc}
                  >
                    <input
                      id={ids.cvc}
                      type="text"
                      inputMode="numeric"
                      value={values.cvc}
                      onChange={set('cvc')}
                      placeholder={checkout.payment.cvc.placeholder}
                      autoComplete={checkout.payment.cvc.autoComplete}
                      maxLength={4}
                      aria-invalid={Boolean(errors.cvc)}
                      aria-describedby={describedBy('cvc', checkout.payment.cvc.hint)}
                      className={cx(inputClass, borderFor('cvc'))}
                    />
                  </Field>
                </div>
              </fieldset>

              <div className="flex flex-col gap-s5">
                <Button
                  type="submit"
                  size="lg"
                  loading={submitting}
                  wrap
                  className="w-full text-center max-sm:px-s5 max-sm:text-md"
                >
                  {submitting
                    ? checkout.processing
                    : plan.trial
                      ? checkout.submitTrial
                      : checkout.submit}
                </Button>

                <ul className="flex flex-wrap items-center justify-center gap-x-s6 gap-y-s3">
                  {checkout.trust.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-s2 text-sm font-medium text-text-muted"
                    >
                      <Icon name={item.icon} size={15} className="shrink-0 text-action-primary" />
                      {item.label}
                    </li>
                  ))}
                </ul>

                <p className="text-center text-sm text-text-muted">{plan.note}</p>
              </div>
            </form>
          </div>

          <div className="max-lg:order-first lg:sticky lg:top-8">
            <h2 className="sr-only">{checkout.summary.heading}</h2>
            <PlanCard plan={plan} as="div" cta={false} headingLevel="h3" />

            <div className="mt-s6 flex flex-col gap-s3 rounded-lg border border-border-default bg-surface-base px-s6 py-s5">
              <span className="flex flex-wrap items-center gap-x-s3 gap-y-s2 text-sm text-text-muted">
                <span className="font-semibold text-text-primary">{promo.badge}</span>
                {promo.note}
                <Countdown endsAt={promo.endsAt} compact />
              </span>
              <a
                href={checkout.changePlan.href}
                className="self-start rounded-xs text-sm font-semibold text-action-primary-active underline underline-offset-4 hover:text-action-primary-hover"
              >
                {checkout.changePlan.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

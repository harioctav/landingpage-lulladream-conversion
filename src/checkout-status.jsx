import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CheckoutStatus from './pages/CheckoutStatus.jsx'

/**
 * One entry for all three outcome pages. Which one to render comes from the
 * HTML itself (`<div id="root" data-status="success">`), so the pages stay
 * static files a payment provider can redirect to.
 */
const root = document.getElementById('root')

createRoot(root).render(
  <StrictMode>
    <CheckoutStatus status={root.dataset.status} />
  </StrictMode>,
)

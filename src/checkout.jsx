import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Checkout from './pages/Checkout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Checkout />
  </StrictMode>,
)

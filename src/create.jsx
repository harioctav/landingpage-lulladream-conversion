import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CreateStory from './pages/CreateStory.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CreateStory />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./stylesheets/inline-style-0.css"
import "./stylesheets/inline-style-1.css"
import "./stylesheets/inline-style-2.css"
import './global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

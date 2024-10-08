import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='h-screen w-screen bg-black'>
    <App />
    </div>
  </StrictMode>,
)

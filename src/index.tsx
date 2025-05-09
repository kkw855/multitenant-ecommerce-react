import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/globals.css'

const root = document.getElementById('root')
if (!root) throw new Error('No root element found')

createRoot(root).render(
    <StrictMode>
      <h1 className="text-amber-400 text-2xl">Hello World!</h1>
      <h1 className="text-amber-400 text-2xl font-mono">Hello World!</h1>
    </StrictMode>,
)

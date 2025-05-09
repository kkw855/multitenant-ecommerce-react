import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/globals.css'
import { Button } from '@/components/ui/button.tsx'

const root = document.getElementById('root')
if (!root) throw new Error('No root element found')

createRoot(root).render(
  <StrictMode>
    <div className="flex flex-col gap-y-4">
      <Button>I am a button</Button>
    </div>
    <div className="text-yellow-300 dark:text-red-400 bg-white">
      Hello World!
    </div>
    <div className="bg-primary">bg-primary</div>
    <div className="bg-secondary">bg-primary</div>
    <Button>Button</Button>
  </StrictMode>,
)

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Progress } from '@/components/ui/progress.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Button>I am a button</Button>
      </div>
      <div>
        <Button variant="elevated">I am a button</Button>
      </div>
      <div>
        <Button variant="default">I am a button</Button>
      </div>
      <div>
        <Input placeholder="I am an input" />
      </div>
      <div>
        <Progress value={50} />
      </div>
      <div>
        <Textarea placeholder="I am a textarea" />
      </div>
      <div>
        <Checkbox />
      </div>
    </div>
  )
}

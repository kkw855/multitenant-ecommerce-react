import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/features')({
  component: Features,
})

function Features() {
  return (
    <div className="p-2">
      <h3>Features</h3>
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pricing')({
  component: Pricing,
})

function Pricing() {
  return (
    <div className="p-2">
      <h3>Pricing</h3>
    </div>
  )
}

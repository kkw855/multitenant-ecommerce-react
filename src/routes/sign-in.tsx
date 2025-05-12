import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-in')({
  component: SignIn,
})

function SignIn() {
  return (
    <div className="p-2">
      <h3>Sign in</h3>
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-up')({
  component: SignIn,
})

function SignIn() {
  return (
    <div className="p-2">
      <h3>Sign up</h3>
    </div>
  )
}

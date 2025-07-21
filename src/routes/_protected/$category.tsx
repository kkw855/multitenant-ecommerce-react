import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/$category')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello category</div>
}

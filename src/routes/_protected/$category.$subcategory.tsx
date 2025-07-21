import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/$category/$subcategory')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello sub</div>
}

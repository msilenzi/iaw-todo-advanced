import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello &quot;/_protected/projects/&quot;!</div>
}

import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello &quot;/_home/&quot;!</div>
}

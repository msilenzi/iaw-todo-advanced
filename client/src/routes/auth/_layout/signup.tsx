import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>Hello &quot;/auth/_layout/signup&quot;!</div>
    </>
  )
}

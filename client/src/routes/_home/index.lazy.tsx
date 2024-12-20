import HomeHero from '@/home/components/HomeHero'
import HomeNavbar from '@/home/components/HomeNavbar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      <HomeNavbar />
      <HomeHero />
    </div>
  )
}

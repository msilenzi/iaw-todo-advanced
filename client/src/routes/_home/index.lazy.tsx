import HomeHero from '@/home/components/HomeHero'
import HomeNavbar from '@/home/components/HomeNavbar'
import { useStore } from '@Common/store'
import { Flex, Loader } from '@mantine/core'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_home/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const isLoading = useStore((state) => state.isLoading)
  const isAuthenticated = useStore((state) => state.isAuthenticated)

  if (isLoading) {
    return (
      <Flex align="center" justify="center" h="100dvh">
        <Loader color="blue" size="xl" type="bars" />
      </Flex>
    )
  }

  if (isAuthenticated) {
    void navigate({ to: '/projects' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      <HomeNavbar />
      <HomeHero />
    </div>
  )
}

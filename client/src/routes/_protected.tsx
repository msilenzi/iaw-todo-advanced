import AuthenticatedNavbar from '@Common/components/AuthenticatedNavbar'
import { useStore } from '@Common/store'
import { Flex, Loader } from '@mantine/core'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
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

  if (!isAuthenticated) {
    void navigate({ to: '/auth/login' })
  }

  return (
    <>
      <AuthenticatedNavbar />
      <Outlet />
    </>
  )
}

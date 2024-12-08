import { Container, Paper, Title } from '@mantine/core'
import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Container size="xs" mt="10vh">
      <Link to="/" style={{ color: 'unset', textDecoration: 'none' }}>
        <Title ta="center" pb="lg">
          Floorplan
        </Title>
      </Link>
      <Paper bg="dark.6" shadow="lg" withBorder radius="md" p="lg">
        <Outlet />
      </Paper>
    </Container>
  )
}

import { Container, Paper, Title } from '@mantine/core'
import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createLazyFileRoute('/auth/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  useEffect(() => {
    const defaultBgColor = document.body.style.backgroundColor
    document.body.style.backgroundColor = 'var(--mantine-color-dark-9)'
    return () => void (document.body.style.backgroundColor = defaultBgColor)
  }, [])

  return (
    <Container size="432" mt="10vh">
      <Link to="/" style={{ color: 'unset', textDecoration: 'none' }}>
        <Title ta="center" pb="lg">
          Todo Advanced
        </Title>
      </Link>
      <Paper shadow="sm" radius="md" p="xl" mb="md">
        <Outlet />
      </Paper>
    </Container>
  )
}

import { Container, Group, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'

import classes from './GenericNavbar.module.css'

type GenericNavbarProps = {
  children: React.ReactNode
}

function GenericNavbar({ children }: GenericNavbarProps) {
  return (
    <header className={classes.header}>
      <Container size="md">
        <Group justify="space-between">{children}</Group>
      </Container>
    </header>
  )
}

function GenericNavbarTitle() {
  return (
    <Link to="/" style={{ color: 'unset', textDecoration: 'none' }}>
      <Title order={3}>Floorplan</Title>
    </Link>
  )
}

GenericNavbar.Title = GenericNavbarTitle

export default GenericNavbar

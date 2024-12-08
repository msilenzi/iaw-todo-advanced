import GenericNavbar from '@Common/components/GenericNavbar'
import { Button } from '@mantine/core'
import { Link } from '@tanstack/react-router'

export default function HomeNavbar() {
  return (
    <GenericNavbar>
      <GenericNavbar.Title />
      <Button size="xs" variant="default" component={Link} to="/auth/login">
        Iniciar sesión
      </Button>
    </GenericNavbar>
  )
}

import GenericNavbar from '@Common/components/GenericNavbar'
import { Button } from '@mantine/core'

export default function HomeNavbar() {
  return (
    <GenericNavbar>
      <GenericNavbar.Title />
      <Button
        size="xs"
        variant="default"
        onClick={() => console.log('iniciar sesión')}
      >
        Iniciar sesión
      </Button>
    </GenericNavbar>
  )
}

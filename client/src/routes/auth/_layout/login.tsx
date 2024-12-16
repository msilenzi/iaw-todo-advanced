import {
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Title ta="center" order={2} mb="md">
        Iniciar sesión
      </Title>
      <form>
        <Stack>
          <TextInput
            label="Correo"
            placeholder="Correo"
            withAsterisk
            autoFocus
          />
          <div>
            <PasswordInput
              label="Contraseña"
              placeholder="Contraseña"
              withAsterisk
            />
            <Text
              size="sm"
              c="dimmed"
              td="underline"
              component={Link}
              to="/auth/login"
            >
              ¿Olvidaste tu contraseña?
            </Text>
          </div>
          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            mt="md"
          >
            Iniciar sesión
          </Button>
          <Text size="sm" ta="center" mt="xs" c="dimmed">
            ¿No tenés una cuenta?{' '}
            <Text c="dark.1" td="underline" component={Link} to="/auth/signup">
              Crear cuenta
            </Text>
          </Text>
        </Stack>
      </form>
    </>
  )
}

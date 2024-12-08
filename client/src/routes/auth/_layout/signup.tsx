import {
  Button,
  NativeSelect,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Title ta="center" order={2} mb="md">
        Crear una cuenta
      </Title>
      <form>
        <Stack>
          <TextInput
            label="Nombre"
            placeholder="Nombre"
            withAsterisk
            autoFocus
          />
          <TextInput label="Apellido" placeholder="Apellido" withAsterisk />
          <DatePickerInput
            label="Fecha de nacimiento"
            placeholder="Fecha de nacimiento"
            withAsterisk
          />
          <NativeSelect
            label="Genero"
            data={['Femenino', 'Masculino', 'Otro']}
            withAsterisk
          />
          <TextInput label="Correo" placeholder="Correo" withAsterisk />
          <PasswordInput
            label="Contraseña"
            placeholder="Contraseña"
            withAsterisk
          />
          <PasswordInput
            label="Confirmar contraseña"
            placeholder="Confirmar contraseña"
            withAsterisk
          />

          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            mt="md"
          >
            Crear cuenta
          </Button>
          <Text size="sm" ta="center" mt="xs" c="dimmed">
            ¿Ya tenés una cuenta?{' '}
            <Text c="dark.1" td="underline" component={Link} to="/auth/login">
              Iniciar sesión
            </Text>
          </Text>
        </Stack>
      </form>
    </>
  )
}

import useSignup from '@/auth/hooks/useSignup'
import { SignUpDtoGenderEnum } from '@Common/api/generated'
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
  const { form, isLoading, handleSubmit } = useSignup()

  return (
    <>
      <Title ta="center" order={2} mb="md">
        Crear una cuenta
      </Title>

      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={isLoading}
          style={{ margin: 0, padding: 0, border: 'none' }}
        >
          <Stack>
            <TextInput
              label="Nombre"
              placeholder="Nombre"
              withAsterisk
              autoFocus
              key={form.key('firstName')}
              {...form.getInputProps('firstName')}
            />
            <TextInput
              label="Apellido"
              placeholder="Apellido"
              withAsterisk
              key={form.key('lastName')}
              {...form.getInputProps('lastName')}
            />
            <DatePickerInput
              label="Fecha de nacimiento"
              placeholder="Fecha de nacimiento"
              valueFormat="DD/MM/YYYY"
              withAsterisk
              key={form.key('dateOfBirth')}
              {...form.getInputProps('dateOfBirth')}
            />
            <NativeSelect
              label="Género"
              data={[
                { label: 'Género', value: '', disabled: true },
                { label: 'Femenino', value: SignUpDtoGenderEnum.Female },
                { label: 'Masculino', value: SignUpDtoGenderEnum.Male },
                { label: 'Otro', value: SignUpDtoGenderEnum.Other },
              ]}
              withAsterisk
              key={form.key('gender')}
              {...form.getInputProps('gender')}
            />
            <TextInput
              label="Correo"
              placeholder="Correo"
              withAsterisk
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Contraseña"
              placeholder="Contraseña"
              withAsterisk
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirmar contraseña"
              placeholder="Confirmar contraseña"
              withAsterisk
              key={form.key('confirmPassword')}
              {...form.getInputProps('confirmPassword')}
            />

            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              mt="md"
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              loaderProps={{ type: 'dots' }}
            >
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
            <Text size="sm" ta="center" mt="xs" c="dimmed">
              ¿Ya tenés una cuenta?{' '}
              <Text
                c="dark.1"
                td="underline"
                component={Link}
                to="/auth/login"
                disabled={isLoading}
              >
                Iniciar sesión
              </Text>
            </Text>
          </Stack>
        </fieldset>
      </form>
    </>
  )
}

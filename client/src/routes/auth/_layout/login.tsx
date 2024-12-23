import useLogin from '@/auth/hooks/useLogin'
import { useStore } from '@Common/store'
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
  const { form, handleSubmit } = useLogin()
  const isLoading = useStore((state) => state.isLoading)
  const error = useStore((state) => state.error)

  return (
    <>
      <Title ta="center" order={2} mb="md">
        Iniciar sesión
      </Title>
      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={isLoading}
          style={{ margin: 0, padding: 0, border: 'none' }}
        >
          <Stack>
            <TextInput
              label="Correo"
              placeholder="Correo"
              withAsterisk
              autoFocus
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <div>
              <PasswordInput
                label="Contraseña"
                placeholder="Contraseña"
                withAsterisk
                key={form.key('password')}
                {...form.getInputProps('password')}
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
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              loaderProps={{ type: 'dots' }}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
            <Text
              size="sm"
              ta="center"
              style={{ color: 'var(--mantine-color-error)' }}
            >
              {error}
            </Text>
            <Text size="sm" ta="center" mt="xs" c="dimmed">
              ¿No tenés una cuenta?{' '}
              <Text
                c="dark.1"
                td="underline"
                component={Link}
                to="/auth/signup"
              >
                Crear cuenta
              </Text>
            </Text>
          </Stack>
        </fieldset>
      </form>
    </>
  )
}

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
import { useForm } from '@mantine/form'
import { createFileRoute, Link } from '@tanstack/react-router'

type SignupForm = {
  firstName: string
  lastName: string
  dateOfBirth: Date | null
  gender: SignUpDtoGenderEnum | ''
  email: string
  password: string
  confirmPassword: string
}

export const Route = createFileRoute('/auth/_layout/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm<SignupForm>({
    mode: 'uncontrolled',
    initialValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      gender: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      firstName: (value) =>
        value.trim().length === 0 ? 'El nombre es obligatorio' : null,
      lastName: (value) =>
        value.trim().length === 0 ? 'El apellido es obligatorio' : null,
      dateOfBirth: (value) =>
        value === null ? 'La fecha de nacimiento es obligatoria' : null,
      gender: (value) => (value === '' ? 'El género es obligatorio' : null),
      email: (value) =>
        value.trim().length === 0 ? 'El correo es obligatorio'
        : !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value.trim()) ?
          'El correo es incorrecto'
        : null,
      password: (value) =>
        value.trim().length === 0 ? 'La contraseña es obligatoria'
        : value.trim().length < 6 ?
          'La contraseña debe tener al menos 6 caracteres'
        : null,
      confirmPassword: (value, values) =>
        value.trim().length === 0 ?
          'La confirmación de contraseña es obligatoria'
        : value !== values.password ? 'Las contraseñas no coinciden'
        : null,
    },
    transformValues: (values) => ({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      email: values.email.trim(),
      password: values.password.trim(),
      confirmPassword: values.confirmPassword.trim(),
    }),
  })

  return (
    <>
      <Title ta="center" order={2} mb="md">
        Crear una cuenta
      </Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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

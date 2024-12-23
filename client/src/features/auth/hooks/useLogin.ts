import authApi from '@Common/api/auth.api'
import { isEmail, useForm } from '@mantine/form'

type LoginForm = {
  email: string
  password: string
}

export default function useLogin() {
  const form = useForm<LoginForm>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) =>
        value.trim().length === 0 ?
          'El correo es obligatorio'
        : (isEmail('El correo no es válido')(value) as string | null),
      password: (value) =>
        value.trim().length === 0 ? 'La contraseña es obligatoria'
        : value.trim().length < 6 ?
          'La contraseña debe tener al menos 6 caracteres'
        : null,
    },
    transformValues: (values) => ({
      email: values.email.trim(),
      password: values.password.trim(),
    }),
  })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    form.onSubmit(async (values) => {
      try {
        const resp = await authApi.login(values)
        console.log(resp)
      } catch (error) {
        console.log(error)
      }
    })(e)
  }

  return { form, handleSubmit }
}

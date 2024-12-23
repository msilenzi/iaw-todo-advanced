import authApi from '@Common/api/auth.api'
import { SignUpDtoGenderEnum } from '@Common/api/generated'
import useNotifications from '@Common/hooks/useNotifications'
import { isEmail, useForm } from '@mantine/form'
import { useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { useState } from 'react'

type SignupForm = {
  firstName: string
  lastName: string
  dateOfBirth: Date | null
  gender: SignUpDtoGenderEnum | ''
  email: string
  password: string
  confirmPassword: string
}

export default function useSignup() {
  const navigate = useNavigate()
  const { showSuccessNotification, showErrorNotification } = useNotifications()
  const [isLoading, setIsLoading] = useState(false)

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
        value.trim().length === 0 ?
          'El correo es obligatorio'
        : (isEmail('El correo no es válido')(value) as string | null),
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    form.onSubmit(async (values) => {
      setIsLoading(true)
      if (values.dateOfBirth == null || values.gender === '') {
        return
      }

      try {
        await authApi.signUp({
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: values.dateOfBirth.toISOString(),
          gender: values.gender,
          email: values.email,
          password: values.password,
        })
        showSuccessNotification({
          title: 'Cuenta creada con éxito',
          message: 'Ya puedes iniciar sesión con tu cuenta',
        })
        void navigate({ to: '/auth/login' })
      } catch (error) {
        if (isAxiosError<Error>(error) && error.response) {
          const { status, data } = error.response

          console.log({ status, data })

          if (
            status === 400 &&
            data.message === 'Ya existe un usuario con este correo.'
          ) {
            form.setErrors({ email: 'Ya existe una cuenta con este correo' })
          } else if (status >= 400 && status < 500) {
            showErrorNotification({
              title: 'Ocurrió un error',
              message: data.message ?? 'Ocurrió un error inesperado',
            })
          } else {
            // Otros errores de servidor
            showErrorNotification({
              title: 'Ocurrió un error',
              message:
                'Hubo un problema al procesar tu solicitud y no pudimos crear tu cuenta. Por favor, inténtalo de nuevo maś tarde',
            })
          }
        } else {
          showErrorNotification({
            title: 'Error de conexión',
            message:
              'No pudimos conectarnos con el servidor. Por favor, verifica tu conexión.',
          })
        }
      } finally {
        setIsLoading(false)
      }
    })(e)
  }

  return { form, isLoading, handleSubmit }
}

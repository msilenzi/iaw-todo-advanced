import { applyDecorators } from '@nestjs/common'
import { MinLength } from 'class-validator'
import { IsTrimmedString } from './is-trimmed-string.decorator'

export function IsPassword() {
  return applyDecorators(
    IsTrimmedString(),
    MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  )
}

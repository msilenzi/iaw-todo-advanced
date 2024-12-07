import { applyDecorators } from '@nestjs/common'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString, isString } from 'class-validator'

export function IsTrimmedString() {
  return applyDecorators(
    Transform(({ value }: { value: unknown }) =>
      isString(value) ? value.trim() : value,
    ),
    IsString({ message: 'El valor debe ser un string' }),
    IsNotEmpty({ message: 'El valor no puede estar vacío' }),
  )
}

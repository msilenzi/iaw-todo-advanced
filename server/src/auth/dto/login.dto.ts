import { IsEmail } from 'class-validator'
import { IsPassword } from 'src/common/decorators/is-password.decorator'

export class LoginDto {
  @IsEmail()
  readonly email: string

  @IsPassword()
  readonly password: string
}

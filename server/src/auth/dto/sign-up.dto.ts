import { IsDateString, IsEmail, IsEnum } from 'class-validator'
import { IsPassword } from 'src/common/decorators/is-password.decorator'
import { IsTrimmedString } from 'src/common/decorators/is-trimmed-string.decorator'
import { Gender } from 'src/users/schemas/user.schema'

export class SignUpDto {
  @IsTrimmedString()
  readonly firstName: string

  @IsTrimmedString()
  readonly lastName: string

  @IsEmail()
  readonly email: string

  @IsDateString()
  readonly dateOfBirth: Date

  @IsEnum(Gender)
  readonly gender: Gender

  @IsPassword()
  readonly password: string
}

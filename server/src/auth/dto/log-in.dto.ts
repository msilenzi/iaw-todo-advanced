import { Transform } from 'class-transformer'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class LogInDto {
  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  readonly password: string
}

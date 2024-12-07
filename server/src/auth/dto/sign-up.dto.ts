import { Transform } from 'class-transformer'
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator'
import { Gender } from 'src/users/schemas/user.schema'

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  readonly firstName: string

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  readonly lastName: string

  @IsEmail()
  readonly email: string

  @IsDateString()
  readonly dateOfBirth: Date

  @IsEnum(Gender)
  readonly gender: Gender

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  readonly password: string
}

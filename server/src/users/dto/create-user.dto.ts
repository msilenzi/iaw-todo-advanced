import { Gender } from '../schemas/user.schema'

export class CreateUserDto {
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly dateOfBirth: Date
  readonly gender: Gender
  readonly password: string
}

import { OmitType } from '@nestjs/swagger'
import { User } from '../schemas/user.schema'

export class FullUserDto extends OmitType(User, ['password'] as const) {}

import { Expose, Type } from 'class-transformer'
import { FullUserDto } from 'src/users/dto/full-user.dto'

export class LogInResponseDto {
  @Expose()
  @Type(() => FullUserDto)
  readonly user: FullUserDto

  @Expose()
  readonly token: string
}

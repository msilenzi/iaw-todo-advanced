import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { FullUserDto } from 'src/users/dto/full-user.dto'

export class LogInResponseDto {
  @ApiProperty({ type: FullUserDto })
  @Expose()
  @Type(() => FullUserDto)
  readonly user: FullUserDto

  @ApiProperty({ type: String })
  @Expose()
  readonly token: string
}

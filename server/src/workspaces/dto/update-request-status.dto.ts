import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'

export enum UpdateRequestStatus {
  APPROBE = 'APPROBE',
  REJECT = 'REJECT',
}

export class UpdateRequestStatusDto {
  @IsEnum(UpdateRequestStatus)
  @ApiProperty({ enum: UpdateRequestStatus })
  readonly status: UpdateRequestStatus
}

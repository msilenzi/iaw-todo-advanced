import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdateWorkspaceDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly name?: string

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean
}

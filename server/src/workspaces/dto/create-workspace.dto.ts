import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  readonly name: string
}

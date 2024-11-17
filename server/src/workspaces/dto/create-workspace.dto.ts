import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import { Types } from 'mongoose'

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsMongoId()
  readonly owner: Types.ObjectId
}

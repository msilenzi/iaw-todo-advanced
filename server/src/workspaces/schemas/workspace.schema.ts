import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { HydratedDocument, Types } from 'mongoose'

@Schema({
  collection: 'workspaces',
  toJSON: { versionKey: false },
})
export class Workspace {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  owner: string

  @Prop({ required: false, type: [String], default: [] })
  members: string[]

  @Prop({ required: false, type: [String], default: [] })
  blockedMembers: string[]

  @Prop({ required: false, type: [String], default: [] })
  pendingRequests: string[]

  @Prop({ required: false, type: [String], default: [] })
  rejectedRequests: string[]

  @Prop({ required: false, default: true })
  isActive: boolean

  @Prop({ required: true, type: Date })
  createdAt: Date

  @ApiProperty({ type: String })
  _id: Types.ObjectId
}

export type WorkspaceDocument = HydratedDocument<Workspace>

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace)

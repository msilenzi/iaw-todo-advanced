import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { HydratedDocument, Types } from 'mongoose'

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Schema({
  collection: 'users',
  timestamps: { createdAt: true, updatedAt: false },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class User {
  @Prop({ type: String, required: true })
  firstName: string

  @Prop({ type: String, required: true })
  lastName: string

  @Prop({ type: String, unique: true, required: true })
  email: string

  @Prop({ type: Date, required: true })
  dateOfBirth: Date

  @Prop({ type: String, required: true, enum: Gender })
  gender: Gender

  // @Prop({ type: String, required: false })
  // profilePicture?: string

  @Prop({ type: String, required: true })
  password: string

  //
  // Metadata:

  // @Prop({ type: Date, default: null })
  // emailVerifiedAt: Date | null

  @ApiProperty({ type: Date })
  createdAt: Date

  // @Prop({ type: Date, default: null })
  // deletedAt: Date | null

  @ApiProperty({ type: String })
  _id: Types.ObjectId
}

export type UserDocument = HydratedDocument<User>

export const UserSchema = SchemaFactory.createForClass(User)

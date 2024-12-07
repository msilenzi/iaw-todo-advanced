import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
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
  @Expose()
  firstName: string

  @Prop({ type: String, required: true })
  @Expose()
  lastName: string

  @Prop({ type: String, unique: true, required: true })
  @Expose()
  email: string

  @Prop({ type: Date, required: true })
  @Expose()
  dateOfBirth: Date

  @Prop({ type: String, required: true, enum: Gender })
  @Expose()
  gender: Gender

  // @Prop({ type: String, required: false })
  // profilePicture?: string

  @Prop({ type: String, required: true })
  @Exclude()
  password: string

  //
  // Metadata:

  // @Prop({ type: Date, default: null })
  // emailVerifiedAt: Date | null

  @ApiProperty({ type: Date })
  @Expose()
  createdAt: Date

  // @Prop({ type: Date, default: null })
  // deletedAt: Date | null

  @ApiProperty({ type: String })
  @Expose()
  _id: Types.ObjectId
}

export type UserDocument = HydratedDocument<User>

export const UserSchema = SchemaFactory.createForClass(User)

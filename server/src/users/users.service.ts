import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userModel.create(createUserDto)
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Ya existe un usuario con este correo.')
      }
      throw error
    }
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec()
  }

  findOneById(id: Types.ObjectId) {
    return this.userModel.findById(id)
  }
}

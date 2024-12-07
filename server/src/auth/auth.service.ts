import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service'
import { SignUpDto } from './dto/sign-up.dto'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(signUpDto: SignUpDto) {
    const hasshedPassword = await bcrypt.hash(signUpDto.password, 10)
    return await this.usersService.create({
      ...signUpDto,
      password: hasshedPassword,
    })
  }
}

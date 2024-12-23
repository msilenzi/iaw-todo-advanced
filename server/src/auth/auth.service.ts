import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service'
import { SignUpDto } from './dto/sign-up.dto'
import { LogInDto } from './dto/log-in.dto'
import { User } from 'src/users/schemas/user.schema'
import { JwtPayload } from './auth.types'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'

const AUTH_COOKIE_KEY = 'auth_token'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const hasshedPassword = await bcrypt.hash(signUpDto.password, 10)
    return await this.usersService.create({
      ...signUpDto,
      password: hasshedPassword,
    })
  }

  async logIn(logInDto: LogInDto, res: Response) {
    const user = await this.usersService.findOneByEmail(logInDto.email)
    if (!user || !(await bcrypt.compare(logInDto.password, user.password))) {
      throw new UnauthorizedException(
        'El correo y/o la contraseña son incorrectos.',
      )
    }

    const payload: JwtPayload = { sub: user._id.toString() }
    const token = await this.jwtService.signAsync(payload)

    res.cookie(AUTH_COOKIE_KEY, token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    })

    return user
  }

  logout(res: Response): void {
    res.clearCookie(AUTH_COOKIE_KEY)
  }
}

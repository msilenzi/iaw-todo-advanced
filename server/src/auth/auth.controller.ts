import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiOperation } from '@nestjs/swagger'
import { SignUpDto } from './dto/sign-up.dto'
import { LogInDto } from './dto/log-in.dto'
import { LogInResponseDto } from './dto/log-in-response.dto'
import { plainToInstance } from 'class-transformer'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Registra un nuevo usuario en el sistema.' })
  @HttpCode(204)
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    await this.authService.signUp(signUpDto)
  }

  @Post('login')
  @ApiOperation({ summary: 'Autentica a un usuario con su email y contraseña' })
  async logIn(@Body() logInDto: LogInDto): Promise<LogInResponseDto> {
    return plainToInstance(
      LogInResponseDto,
      await this.authService.logIn(logInDto),
      { excludeExtraneousValues: true, enableImplicitConversion: true },
    )
  }
}

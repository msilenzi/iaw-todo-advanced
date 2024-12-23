import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Response } from 'express'
import { CustomThrottlerGuard } from 'src/common/guards/custom-throttler.guard'
import { SerializerInterceptor } from 'src/common/interceptors/serializer.interceptor'
import { FullUserDto } from 'src/users/dto/full-user.dto'
import { AuthService } from './auth.service'
import { LogInResponseDto } from './dto/log-in-response.dto'
import { LogInDto } from './dto/log-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Controller('auth')
@UseGuards(CustomThrottlerGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Registra un nuevo usuario en el sistema' })
  @HttpCode(204)
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    await this.authService.signUp(signUpDto)
  }

  @Post('login')
  @ApiOperation({ summary: 'Autentica a un usuario con su email y contraseña' })
  @UseInterceptors(new SerializerInterceptor(FullUserDto))
  async login(
    @Body() logInDto: LogInDto,
    @Res({ passthrough: true }) res: Response, // 1.
  ): Promise<FullUserDto> {
    return await this.authService.logIn(logInDto, res)
  }

  @Post('logout')
  @ApiOperation({ summary: 'Elimina la cookie de sesión del usuario' })
  @HttpCode(204)
  async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    this.authService.logout(res)
  }
}

/**
 * 1. Cuando se usa `@Res()`, NestJS asume que vamos a menejar toda la lógica
 *    de la respuesta, lo que desactiva su comportamiento automático.
 *    Cuando se establece `passthrough: true`, le indicamos a NestJS que
 *    queremos acceder al objeto de la respuesta (Response) para personalizar
 *    ciertas cosas, pero que queremos que siga gestionando la respuesta
 *    automáticamente.
 */

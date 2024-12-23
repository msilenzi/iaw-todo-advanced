import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { CustomThrottlerGuard } from 'src/common/guards/custom-throttler.guard'
import { SerializerInterceptor } from 'src/common/interceptors/serializer.interceptor'
import { AuthService } from './auth.service'
import { LogInResponseDto } from './dto/log-in-response.dto'
import { LogInDto } from './dto/log-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Controller('auth')
@UseGuards(CustomThrottlerGuard)
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
  @UseInterceptors(new SerializerInterceptor(LogInResponseDto))
  async logIn(@Body() logInDto: LogInDto): Promise<LogInResponseDto> {
    return await this.authService.logIn(logInDto)
  }
}

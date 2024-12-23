import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(): Promise<void> {
    throw new HttpException(
      {
        status: HttpStatus.TOO_MANY_REQUESTS,
        message:
          'Demasiadas solicitudes. Por favor, inténtelo nuevamente en unos instantes',
        error: 'Too Many Requests',
      },
      HttpStatus.TOO_MANY_REQUESTS,
    )
  }
}

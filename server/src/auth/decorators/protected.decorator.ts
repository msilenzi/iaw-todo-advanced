import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiCookieAuth } from '@nestjs/swagger'
import { AuthCookiesKeys } from '../auth.service'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'

export const Protected = () => {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiCookieAuth(AuthCookiesKeys.AccessToken),
  )
}

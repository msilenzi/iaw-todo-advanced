import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import config from 'src/config'
import { AuthCookiesKeys } from '../auth.service'
import { JwtPayload } from '../auth.types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req || !req.cookies) return null
        return req.cookies[AuthCookiesKeys.AccessToken]
      },
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET_KEY,
    })
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub }
  }
}

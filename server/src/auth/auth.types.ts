export type JwtPayload = {
  sub: string
}

export type AuthenticatedRequest = Request & { user: JwtPayload }

import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import config from './config'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGODB_URI),
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

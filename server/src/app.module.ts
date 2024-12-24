import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ThrottlerModule } from '@nestjs/throttler'
import { AuthModule } from './auth/auth.module'
import config from './config'
import { UsersModule } from './users/users.module'

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

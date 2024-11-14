import { Module } from '@nestjs/common'
import { AuthzModule } from './authz/authz.module'
import { MongooseModule } from '@nestjs/mongoose'
import { config } from './app.config'

@Module({
  imports: [MongooseModule.forRoot(config.MONGODB_URI), AuthzModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

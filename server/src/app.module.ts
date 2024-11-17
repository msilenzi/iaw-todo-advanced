import { Module } from '@nestjs/common'
import { AuthzModule } from './authz/authz.module'
import { MongooseModule } from '@nestjs/mongoose'
import { config } from './app.config'
import { WorkspacesModule } from './workspaces/workspaces.module'

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGODB_URI),
    AuthzModule,
    WorkspacesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

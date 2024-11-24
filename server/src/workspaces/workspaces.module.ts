import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { WorkspaceMembersController } from './controllers/workspace-members.controller'
import { WorkspaceRequestsController } from './controllers/workspace-requests.controller'
import { WorkspacesController } from './controllers/workspaces.controller'
import { Workspace, WorkspaceSchema } from './schemas/workspace.schema'
import { WorkspaceMembersService } from './services/workspace-members.service'
import { WorkspaceRequestsService } from './services/workspace-requests.service'
import { WorkspacesService } from './services/workspaces.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
  ],
  controllers: [
    WorkspacesController,
    WorkspaceMembersController,
    WorkspaceRequestsController,
  ],
  providers: [
    WorkspacesService,
    WorkspaceRequestsService,
    WorkspaceMembersService,
  ],
})
export class WorkspacesModule {}

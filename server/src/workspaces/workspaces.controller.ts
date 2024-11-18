import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { ParseMongoIdPipePipe } from 'src/common/pipes/parse-mongo-id-pipe.pipe'
import { CreateWorkspaceDto } from './dto/create-workspace.dto'
import { UpdateWorkspaceDto } from './dto/update-workspace.dto'
import { Workspace } from './schemas/workspace.schema'
import { WorkspacesService } from './workspaces.service'

@Controller('workspaces')
@ApiBearerAuth('Auth0')
@UseGuards(AuthGuard('jwt'))
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workspace' })
  create(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @Req() req: any
  ): Promise<Workspace> {
    return this.workspacesService.create(createWorkspaceDto, req.user.sub)
  }

  @Get()
  @ApiOperation({ summary: 'Get all workspaces the user belongs to' })
  findAll(@Req() req: any): Promise<Workspace[]> {
    return this.workspacesService.findAll(req.user.sub)
  }

  @Get(':workspaceId')
  @ApiOperation({ summary: 'Get details of a specific workspace' })
  @ApiParam({ name: 'workspaceId', type: String })
  findOne(
    @Param('workspaceId', ParseMongoIdPipePipe) workspaceId: Types.ObjectId,
    @Req() req: any
  ): Promise<Workspace> {
    return this.workspacesService.findOne(workspaceId, req.user.sub)
  }

  @Patch(':workspaceId')
  @ApiOperation({ summary: 'Update workspace details' })
  @ApiParam({ name: 'workspaceId', type: String })
  update(
    @Param('workspaceId', ParseMongoIdPipePipe) workspaceId: Types.ObjectId,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
    @Req() req: any
  ): Promise<Workspace> {
    return this.workspacesService.update(
      workspaceId,
      updateWorkspaceDto,
      req.user.sub
    )
  }

  @Delete(':workspaceId')
  @ApiOperation({ summary: 'Delete a workspace' })
  remove(
    @Param('workspaceId', ParseMongoIdPipePipe) workspaceId: Types.ObjectId,
    @Req() req: any
  ) {
    return this.workspacesService.remove(workspaceId, req.user.sub)
  }
}

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

  @Get(':id')
  @ApiOperation({ summary: 'Get a workspace' })
  @ApiParam({ name: 'id', type: String })
  findOne(
    @Param('id', ParseMongoIdPipePipe) id: Types.ObjectId,
    @Req() req: any
  ): Promise<Workspace> {
    return this.workspacesService.findOne(id, req.user.sub)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workspace' })
  @ApiParam({ name: 'id', type: String })
  update(
    @Param('id', ParseMongoIdPipePipe) id: Types.ObjectId,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
    @Req() req: any
  ): Promise<Workspace> {
    return this.workspacesService.update(id, updateWorkspaceDto, req.user.sub)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workspace' })
  remove(@Param('id') id: Types.ObjectId, @Req() req: any) {
    return this.workspacesService.remove(id, req.user.sub)
  }
}

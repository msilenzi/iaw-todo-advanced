import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common'
import { WorkspacesService } from './workspaces.service'
import { CreateWorkspaceDto } from './dto/create-workspace.dto'
import { UpdateWorkspaceDto } from './dto/update-workspace.dto'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { Workspace } from './schemas/workspace.schema'

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
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto
  ) {
    return this.workspacesService.update(+id, updateWorkspaceDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(+id)
  }
}

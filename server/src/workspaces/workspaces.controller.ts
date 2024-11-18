import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Types } from 'mongoose'
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id-pipe.pipe'
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
  @ApiCreatedResponse({
    description: 'Workspace created successfully',
    type: Workspace,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  create(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @Req() req: any
  ): Promise<Workspace> {
    return this.workspacesService.create(createWorkspaceDto, req.user.sub)
  }

  @Get()
  @ApiOperation({ summary: 'Get all workspaces the user belongs to' })
  @ApiOkResponse({ description: 'List of user workspaces', type: [Workspace] })
  @ApiBadRequestResponse({ description: 'Invalid request parameters' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  findAll(@Req() req: any): Promise<Workspace[]> {
    return this.workspacesService.findAll(req.user.sub)
  }

  @Get(':workspaceId')
  @ApiOperation({ summary: 'Get details of a specific workspace' })
  @ApiParam({ name: 'workspaceId', type: String })
  @ApiOkResponse({ description: 'Workspace details', type: Workspace })
  @ApiBadRequestResponse({ description: 'Invalid workspace ID format' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({
    description: 'User does not have permission to access this workspace',
  })
  @ApiNotFoundResponse({ description: 'Workspace not found' })
  findOne(
    @Param('workspaceId', ParseMongoIdPipe) workspaceId: Types.ObjectId,
    @Req() req: any
  ): Promise<Workspace> {
    return this.workspacesService.findOne(workspaceId, req.user.sub)
  }

  @Patch(':workspaceId')
  @ApiOperation({ summary: 'Update workspace details' })
  @ApiParam({ name: 'workspaceId', type: String })
  @ApiOkResponse({
    description: 'Workspace updated successfully',
    type: Workspace,
  })
  @ApiBadRequestResponse({
    description: 'Invalid update data or workspace ID format',
  })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({
    description: 'User does not have permission to update this workspace',
  })
  @ApiNotFoundResponse({ description: 'Workspace not found' })
  update(
    @Param('workspaceId', ParseMongoIdPipe) workspaceId: Types.ObjectId,
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
  @ApiParam({ name: 'workspaceId', type: String })
  @ApiNoContentResponse({ description: 'Workspace deleted successfully' })
  @ApiBadRequestResponse({ description: 'Invalid workspace ID format' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({
    description: 'User does not have permission to delete this workspace',
  })
  @ApiNotFoundResponse({ description: 'Workspace not found' })
  @HttpCode(204)
  remove(
    @Param('workspaceId', ParseMongoIdPipe) workspaceId: Types.ObjectId,
    @Req() req: any
  ): Promise<void> {
    return this.workspacesService
      .remove(workspaceId, req.user.sub)
      .then(() => {})
  }
}

import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id-pipe.pipe'
import { UpdateRequestStatusDto } from '../dto/update-request-status.dto'
import { Workspace } from '../schemas/workspace.schema'
import { WorkspaceRequestsService } from '../services/workspace-requests.service'

// TODO: Add ApiResponse documentation

@Controller('workspaces/:workspaceId/requests')
@ApiBearerAuth('Auth0')
@UseGuards(AuthGuard('jwt'))
export class WorkspaceRequestsController {
  constructor(private readonly requestsService: WorkspaceRequestsService) {}

  @Post()
  @ApiOperation({ summary: 'Create workspace request' })
  @ApiParam({ name: 'workspaceId', type: String })
  @HttpCode(204)
  async createRequest(
    @Param('workspaceId', ParseMongoIdPipe) workspaceId: Types.ObjectId,
    @Req() req: any
  ): Promise<void> {
    await this.requestsService.createRequest(workspaceId, req.user.sub)
  }

  // @Get()
  // @ApiOperation({ summary: 'Get all workspace requests' })
  // getRequests() {}

  @Delete()
  @ApiOperation({ summary: 'Cancel workspace request' })
  @ApiParam({ name: 'workspaceId', type: String })
  @HttpCode(204)
  async cancelRequest(
    @Param('workspaceId', ParseMongoIdPipe) workspaceId: Types.ObjectId,
    @Req() req: any
  ) {
    await this.requestsService.cancelRequest(workspaceId, req.user.sub)
  }

  @Patch(':requesterId')
  @ApiOperation({ summary: 'Accept or reject a request ' })
  @ApiParam({ name: 'workspaceId', type: String })
  updateRequestStatus(
    @Param('workspaceId', ParseMongoIdPipe) workspaceId: Types.ObjectId,
    @Param('requesterId') requesterId: string,
    @Req() req: any,
    @Body() updateRequestStatusDto: UpdateRequestStatusDto
  ): Promise<Workspace> {
    return this.requestsService.updateRequestStatus(
      workspaceId,
      requesterId,
      updateRequestStatusDto,
      req.user.sub
    )
  }
}

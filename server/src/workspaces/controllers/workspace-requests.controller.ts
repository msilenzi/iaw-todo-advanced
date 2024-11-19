import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

@Controller('workspaces/:workspaceId/requests')
@ApiBearerAuth('Auth0')
@UseGuards(AuthGuard('jwt'))
export class WorkspaceRequestsController {
  @Post()
  @ApiOperation({ summary: 'Create workspace request' })
  createRequest() {}

  @Get()
  @ApiOperation({ summary: 'Get all workspace requests' })
  getRequests() {}

  @Delete(':requesterId')
  @ApiOperation({ summary: 'Cancel workspace request' })
  cancelRequest(
    @Param('workspaceId') workspaceId: string,
    @Param('requesterId') requesterId: string
  ) {
    return `DELETE request: workspaceId: ${workspaceId}, requesterId: ${requesterId}`
  }

  @Patch(':requesterId')
  @ApiOperation({ summary: 'Accept or reject a request ' })
  updateRequest() {}
}

import { Controller, Delete, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

@Controller('workspaces/:workspaceId/members')
@ApiBearerAuth('Auth0')
@UseGuards(AuthGuard('jwt'))
export class WorkspaceMembersController {
  @Get()
  @ApiOperation({ summary: 'Get all workspace members' })
  getMembers() {}

  @Delete()
  @ApiOperation({ summary: 'Delete member' })
  deleteMember() {}
}

import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { WorkspacesService } from './workspaces.service'
import { Workspace } from '../schemas/workspace.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import {
  UpdateRequestStatus,
  UpdateRequestStatusDto,
} from '../dto/update-request-status.dto'

@Injectable()
export class WorkspaceRequestsService {
  constructor(
    private readonly workspacesService: WorkspacesService,
    @InjectModel(Workspace.name) private workspaceModel: Model<Workspace>
  ) {}

  async createRequest(workspaceId: Types.ObjectId, userId: string) {
    const workspace = await this.workspacesService._findById(workspaceId)
    this._validateCreateRequest(workspace, userId)
    workspace.pendingRequests.push(userId)
    await workspace.save()
    return
  }

  async cancelRequest(workspaceId: Types.ObjectId, userId: string) {
    const workspace = await this.workspacesService._findById(workspaceId)
    const userIndex = workspace.pendingRequests.indexOf(userId)
    if (userIndex === -1) {
      throw new ConflictException(
        'You do not have a pending request for this workspace'
      )
    }
    workspace.pendingRequests.splice(userIndex, 1)
    await workspace.save()
    return
  }

  async updateRequestStatus(
    workspaceId: Types.ObjectId,
    requesterId: string,
    updateRequestStatusDto: UpdateRequestStatusDto,
    userId: string
  ) {
    const workspace = await this.workspacesService._findById(workspaceId)
    this._validateUpdateRequestStatus(workspace, userId, requesterId)

    const pendingIndex = workspace.pendingRequests.indexOf(requesterId)
    workspace.pendingRequests.splice(pendingIndex, 1)

    if (updateRequestStatusDto.status === UpdateRequestStatus.APPROBE) {
      workspace.members.push(requesterId)
    } else if (updateRequestStatusDto.status === UpdateRequestStatus.REJECT) {
      workspace.rejectedRequests.push(requesterId)
    }

    return await workspace.save()
  }

  private _validateCreateRequest(workspace: Workspace, userId: string) {
    if (workspace.pendingRequests.includes(userId)) {
      throw new ConflictException(
        'You already have a pending request to join this workspace.'
      )
    }
    if (workspace.owner === userId || workspace.members.includes(userId)) {
      throw new ConflictException('You are already a member of this workspace')
    }
    if (
      workspace.blockedMembers.includes(userId) ||
      workspace.rejectedRequests.includes(userId)
    ) {
      throw new ConflictException('You cannot request to join this workspace.')
    }
  }

  private _validateUpdateRequestStatus(
    workspace: Workspace,
    userId: string,
    requesterId: string
  ) {
    if (userId !== workspace.owner) {
      throw new ForbiddenException(
        'You do not have permission to evaluate this request'
      )
    }
    if (!workspace.pendingRequests.includes(requesterId)) {
      throw new ConflictException('The user does not have a pending request')
    }
  }
}

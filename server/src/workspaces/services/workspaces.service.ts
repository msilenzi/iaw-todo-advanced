import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateWorkspaceDto } from '../dto/create-workspace.dto'
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto'
import { Workspace } from '../schemas/workspace.schema'

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<Workspace>
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto, ownerId: string) {
    return this.workspaceModel.create({
      ...createWorkspaceDto,
      createdAt: new Date(),
      owner: ownerId,
    })
  }

  async findAll(userId: string) {
    return this.workspaceModel
      .find({
        $or: [{ owner: userId }, { members: { $in: [userId] } }],
      })
      .exec()
  }

  async findOne(workspaceId: Types.ObjectId, userId: string) {
    const workspace = await this.workspaceModel.findById(workspaceId).exec()

    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${workspaceId} not found`)
    }
    if (workspace.owner !== userId && !workspace.members.includes(userId)) {
      throw new ForbiddenException(
        'You do not have permission to access this workspace'
      )
    }
    return workspace
  }

  async update(
    workspaceId: Types.ObjectId,
    updateWorkspaceDto: UpdateWorkspaceDto,
    userId: string
  ) {
    const workspace = await this.findOne(workspaceId, userId)
    if (workspace.owner !== userId) {
      throw new ForbiddenException(
        'You do not have permission to modify this workspace'
      )
    }
    Object.assign(workspace, updateWorkspaceDto)
    return workspace.save()
  }

  async remove(workspaceId: Types.ObjectId, userId: string) {
    const workspace = await this.findOne(workspaceId, userId)
    if (workspace.owner !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this workspace'
      )
    }
    workspace.isActive = false
    workspace.save()
  }
}

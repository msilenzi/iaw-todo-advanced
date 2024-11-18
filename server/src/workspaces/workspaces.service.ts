import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateWorkspaceDto } from './dto/create-workspace.dto'
import { UpdateWorkspaceDto } from './dto/update-workspace.dto'
import { Workspace } from './schemas/workspace.schema'

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<Workspace>
  ) {}

  async create(
    createWorkspaceDto: CreateWorkspaceDto,
    ownerId: string
  ): Promise<Workspace> {
    return this.workspaceModel.create({
      ...createWorkspaceDto,
      createdAt: new Date(),
      owner: ownerId,
    })
  }

  async findAll(userId: string): Promise<Workspace[]> {
    return this.workspaceModel
      .find({
        $or: [{ owner: userId }, { members: { $in: [userId] } }],
      })
      .exec()
  }

  async findOne(
    workspaceId: Types.ObjectId,
    userId: string
  ): Promise<Workspace> {
    const workspace = await this.workspaceModel.findById(workspaceId).exec()

    console.log({ workspace, workspaceId, userId })

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

  update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    return `This action updates a #${id} workspace`
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`
  }
}

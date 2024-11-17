import { Injectable } from '@nestjs/common'
import { CreateWorkspaceDto } from './dto/create-workspace.dto'
import { UpdateWorkspaceDto } from './dto/update-workspace.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Workspace } from './schemas/workspace.schema'
import { Model } from 'mongoose'

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<Workspace>
  ) {}

  create(
    createWorkspaceDto: CreateWorkspaceDto,
    ownerId: string
  ): Promise<Workspace> {
    return this.workspaceModel.create({
      ...createWorkspaceDto,
      createdAt: new Date(),
      owner: ownerId,
    })
  }

  findAll(userId: string): Promise<Workspace[]> {
    return this.workspaceModel
      .find({
        $or: [{ owner: userId }, { members: { $in: [userId] } }],
      })
      .exec()
  }

  findOne(id: number) {
    return `This action returns a #${id} workspace`
  }

  update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    return `This action updates a #${id} workspace`
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`
  }
}

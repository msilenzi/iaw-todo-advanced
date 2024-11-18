import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isValidObjectId, Types } from 'mongoose'

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException('Invalid ID format')
    }
    return new Types.ObjectId(value)
  }
}

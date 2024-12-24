import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { isValidObjectId, Types } from 'mongoose'
// import { Types } from 'mongoose'

export const UserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    if (!isValidObjectId(request?.user?.userId)) {
      throw new Error(
        'Invalid `userId`. Make sure @Protected() decorator is applied.',
      )
    }
    return new Types.ObjectId(request.user.userId as string)
  },
)

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Block, BlockDocument } from 'src/database/schemas/block.schema';
import { Position } from 'src/database/schemas/position.schema';
import { User, UserDocument } from 'src/database/schemas/user.schema';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserByUid(uid: string) {
    return this.userModel.findOne({
        uid: uid
    }).exec()
  }
}

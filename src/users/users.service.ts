import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/database/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserByUid(uid: string) {
    const user = await this.userModel
      .findOne({
        uid: uid,
      })
      .exec();

    if (user) return user;

    const newUser = new this.userModel({
      uid: uid,
    });
    console.log(newUser);
    await newUser.save();
    return newUser;
  }
}

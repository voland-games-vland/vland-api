import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Money, MoneyDocument } from 'src/database/schemas/money.schema';
import { User, UserDocument } from 'src/database/schemas/user.schema';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Money.name)
    private readonly moneyModel: Model<MoneyDocument>,
  ) { }

  async getUserByUid(uid: string) {
    const userFirebase = await admin.auth().getUser(uid);
    if (!userFirebase.uid) throw `No User with ${uid} exists.`;
    const user = await this.userModel
      .findOne({
        uid: uid,
      })
      .exec();

    if (user) return user;

    const newUser = new this.userModel({
      uid: uid,
    });
    await newUser.save();
    return newUser;
  }

  async getMoneyByUid(uid: string) {
    const user = await admin.auth().getUser(uid);
    if (!user.uid) throw `No User with ${uid} exists.`;
    const money = await this.moneyModel
      .findOne({
        uid: uid,
      })
      .exec();

    if (money) return money;

    const newMoney = new this.moneyModel({
      uid: uid,
    });
    await newMoney.save();
    return newMoney as MoneyDocument;
  }

  async updateUserNicknameByUid(uid: string, nickname: string) {
    const user = await this.userModel.findOneAndUpdate({
      uid: uid
    }, {
      nickname: nickname
    }, {
      new: true
    }).exec()
    return user
  }
}

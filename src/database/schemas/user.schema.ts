import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
  toJSON: {
    virtuals: true,
  },
})
export class User {
  _id: string;

  __v: string;

  createdAt: Date;

  updatedAt: Date;

  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ default: 0 })
  coins: number;

  @Prop({ default: 0 })
  banknotes: number;

  @Prop({ default: 'User' })
  nickname: string;

  @Prop({ default: 0 })
  xp: number;

  level: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ createdAt: -1 });
UserSchema.index({ updatedAt: -1 });
UserSchema.virtual('level').get(function (this: UserDocument) {
  const calculatePlayerLevel = (xp: number): number => {
    let level = 1;
    let xpForNextLevel = 100;
    while (xp >= xpForNextLevel) {
      xp -= xpForNextLevel;
      xpForNextLevel += 100 * level;
      level++;
    }
    return level;
  };

  return calculatePlayerLevel(this.xp);
});

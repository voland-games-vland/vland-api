import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
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
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ createdAt: -1 });
UserSchema.index({ updatedAt: -1 });

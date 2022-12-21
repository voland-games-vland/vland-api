import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type MapDocument = Map & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Map {
  _id: string;

  __v: string;

  createdAt: Date;

  updatedAt: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  owner?: string;

  @Prop(
    raw({
      teams: { type: Number, default: 2 },
      scoreToWin: { type: Number, default: 1000 },
      timeLimitInSeconds: { type: Number, default: 600 },
    }),
  )
  settings: {
    teams: number;
    scoreToWin: number;
    timeLimitInSeconds: number;
  };

  @Prop({ default: 30 })
  width: number;

  @Prop({ default: 20 })
  height: number;
}

export const MapSchema = SchemaFactory.createForClass(Map);
MapSchema.index({ createdAt: -1 });
MapSchema.index({ updatedAt: -1 });

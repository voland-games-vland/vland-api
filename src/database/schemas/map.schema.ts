import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Number } from 'mongoose';

export type MapDocument = Map & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
  toJSON: {
    virtuals: true,
  },
})
export class Map {
  id: string;
  
  _id: string;

  __v: string;

  createdAt: Date;

  updatedAt: Date;

  @Prop({required: true})
  name: string;

  @Prop({
    default: 2
  })
  teams: number

  @Prop({
    default: 1000
  })
  scoreToWin: number

  @Prop({
    default: 600
  })
  timeLimitInSeconds: number
}

export const MapSchema = SchemaFactory.createForClass(Map);
MapSchema.index({ createdAt: -1 });
MapSchema.index({ updatedAt: -1 });
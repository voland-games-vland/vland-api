import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop()
  title: string;

  @Prop()
  isDone: boolean
}

export const MapSchema = SchemaFactory.createForClass(Map);
MapSchema.index({ createdAt: -1 });
MapSchema.index({ updatedAt: -1 });
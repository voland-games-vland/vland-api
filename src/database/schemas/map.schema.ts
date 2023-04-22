import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { MapSettings } from './map-settings.schema';

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

  @Prop({ type: MapSettings, required: true, default: new MapSettings() })
  settings: MapSettings;

  @Prop({ default: 30 })
  width: number;

  @Prop({ default: 20 })
  height: number;
}

export const MapSchema = SchemaFactory.createForClass(Map);
MapSchema.index({ createdAt: -1 });
MapSchema.index({ updatedAt: -1 });

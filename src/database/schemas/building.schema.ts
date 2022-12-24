import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Position } from './position.schema';

export type BuildingDocument = Building & Document;

export enum Buildings {
  Spawn = 'Spawn',
  CapturePoint = 'CapturePoint',
  Teleporter = 'Teleporter',
  Spawner = 'Spawner',
}

@Schema()
export class Building {
  _id: string;

  @Prop({ type: String, enum: Buildings, required: true, default: Buildings.Spawn })
  type: Buildings;

  @Prop({ type: Position, required: true })
  position: Position;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Map' })
  map: string;
}

export const BuildingSchema = SchemaFactory.createForClass(Building);

BuildingSchema.index({ position: 1, map: 1 }, { unique: true });

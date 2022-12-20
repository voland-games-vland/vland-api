import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Map } from './map.schema';
import { Position } from './position.schema';

export type BlockDocument = Block & Document;

export enum Blocks {
  Stone = 'Stone',
  Grass = 'Grass',
  Dirt = 'Dirt',
  Wood = 'Wood',
  Bridge = 'Bridge',
  Snow = 'Snow',
  Sand = 'Sand',
  Water = 'Water',
}

@Schema()
export class Block {
  _id: string;

  @Prop({ type: String, enum: Blocks, required: true, default: Blocks.Stone })
  type: Blocks;

  @Prop({ type: Position, required: true })
  position: Position;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Map' })
  map: Map;
}

export const BlockSchema = SchemaFactory.createForClass(Block);

BlockSchema.index({ position: 1, map: 1}, { unique: true})

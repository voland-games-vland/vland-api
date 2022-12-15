import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position.schema';

export type BlockDocument = Block & Document;

export enum Blocks {
  Stone,
  Grass,
  Dirt,
  Wood,
  Bridge,
  Snow,
  Sand,
  Water,
}

@Schema()
export class Block {
  _id: string;

  @Prop({ type: String, enum: Blocks, required: true, default: Blocks.Stone })
  type: Blocks;

  @Prop({ type: Position, required: true })
  position: Position;
}

export const BlockSchema = SchemaFactory.createForClass(Block);

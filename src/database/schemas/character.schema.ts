import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CharacterAttributes } from './characterAttributes.schema';
import { CharacterLook } from './characterLook.schema';

export type CharacterDocument = Character & Document;

export enum Weapon {
  Sword = 'Sword',
  Daggers = 'Daggers',
  Hammer = 'Hammer',
  Spear = 'Spear',
  Bow = 'Bow',
  Pistols = 'Pistols',
  Sniper = 'Sniper',
}

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Character {
  _id: string;
  __v: string;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  userId?: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, enum: Weapon, required: true, default: Weapon.Sword })
  weaponType: Weapon;

  @Prop({ type: CharacterAttributes, required: true, default: new CharacterAttributes() })
  attributes: CharacterAttributes;

  @Prop({ type: CharacterLook, required: true, default: new CharacterLook() })
  look: CharacterLook;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);

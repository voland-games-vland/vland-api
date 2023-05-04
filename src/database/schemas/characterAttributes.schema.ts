import { Prop, Schema } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';

@Schema({
  _id: false,
})
export class CharacterAttributes {
  @Prop({ required: true, default: 0 })
  @IsNumber()
  maxHealth: number;

  @Prop({ required: true, default: 0 })
  @IsNumber()
  maxShield: number;

  @Prop({ required: true, default: 0 })
  @IsNumber()
  attackDamage: number;

  @Prop({ required: true, default: 0 })
  @IsNumber()
  moveSpeed: number;
}

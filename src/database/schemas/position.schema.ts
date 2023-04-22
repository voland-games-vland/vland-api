import { Prop, Schema } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';

@Schema({
  _id: false,
})
export class Position {
  @Prop({ required: true })
  @IsNumber()
  x: number;

  @Prop({ required: true })
  @IsNumber()
  y: number;

  @Prop({ required: true })
  @IsNumber()
  z: number;
}

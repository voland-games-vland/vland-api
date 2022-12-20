import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class Position {
  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;

  @Prop({ required: true })
  z: number;
}

import { Prop, Schema } from '@nestjs/mongoose';
import { IsNumber, Min } from 'class-validator';

@Schema({
  _id: false,
})
export class MapSettings {
  @Prop({ required: true, default: 2 })
  @IsNumber()
  @Min(1)
  teams: number;

  @Prop({ required: true, default: 1000 })
  @IsNumber()
  @Min(1)
  scoreToWin: number;

  @Prop({ required: true, default: 600 })
  @IsNumber()
  timeLimitInSeconds: number;
}

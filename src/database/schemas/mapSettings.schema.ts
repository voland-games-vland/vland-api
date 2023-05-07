import { Prop, Schema } from '@nestjs/mongoose';
import { IsEnum, IsNumber, Min } from 'class-validator';

export enum Daytime {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Dawn = 'Dawn',
  Night = 'Night',
}

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

  @Prop({ type: String, enum: Daytime, required: true, default: Daytime.Morning })
  @IsEnum(Daytime)
  daytime: Daytime;
}

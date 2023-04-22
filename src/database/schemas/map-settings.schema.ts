import { Prop, Schema } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';

@Schema({
    _id: false,
})
export class MapSettings {
    @Prop({ required: true, default: 2 })
    @IsNumber()
    teams: number;

    @Prop({ required: true, default: 1000 })
    @IsNumber()
    scoreToWin: number;
    
    @Prop({ required: true, default: 600 })
    @IsNumber()
    timeLimitInSeconds: number;
}

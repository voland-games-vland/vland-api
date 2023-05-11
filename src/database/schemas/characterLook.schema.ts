import { Prop, Schema } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';

export enum Gender {
    Male = 'Male',
    Female = 'Female',
}

export enum Skin {
    Ninja = 'Ninja',
    Warrior = 'Warrior',
    Mummy = 'Mummy',
    Orc = 'Orc',
    Skeleton = 'Skeleton'
}


@Schema({
    _id: false,
})
export class CharacterLook {
    @Prop({ type: String, enum: Gender, required: true, default: Gender.Female })
    @IsEnum(Gender)
    gender: Gender;

    @Prop({ type: String, enum: Skin, required: true, default: Skin.Ninja })
    @IsEnum(Skin)
    skin: Skin
}

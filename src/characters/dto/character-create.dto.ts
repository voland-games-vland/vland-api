import { IsString, Length } from 'class-validator';

export class CharacterCreateDto {
  @Length(3, 30)
  @IsString()
  name: string;
}

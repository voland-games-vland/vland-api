import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Weapon } from 'src/database/schemas/character.schema';

export class CharacterPatchDto {
  @Length(3, 30)
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(Weapon)
  @IsOptional()
  weaponType?: Weapon;
}

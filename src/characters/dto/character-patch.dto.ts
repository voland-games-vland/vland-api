import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { Weapon } from 'src/database/schemas/character.schema';
import { CharacterAttributes } from 'src/database/schemas/characterAttributes.schema';

export class CharacterPatchDto {
  @Length(3, 30)
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(Weapon)
  @IsOptional()
  weaponType?: Weapon;

  @ValidateNested()
  @Type(() => CharacterAttributes)
  @IsOptional()
  attributes?: CharacterAttributes;
}

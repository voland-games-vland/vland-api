import { Type } from 'class-transformer';
import { IsEnum, IsMongoId, ValidateNested } from 'class-validator';
import { Buildings } from 'src/database/schemas/building.schema';
import { Position } from 'src/database/schemas/position.schema';

export class BuildingPutDto {
  @IsEnum(Buildings)
  type: Buildings;
  @ValidateNested()
  @Type(() => Position)
  position: Position;
  @IsMongoId()
  map: string;
}

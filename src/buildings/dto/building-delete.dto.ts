import { Type } from 'class-transformer';
import { IsMongoId, ValidateNested } from 'class-validator';
import { Position } from 'src/database/schemas/position.schema';

export class BuildingDeleteDto {
  @ValidateNested()
  @Type(() => Position)
  position: Position;
  @IsMongoId()
  map: string;
}

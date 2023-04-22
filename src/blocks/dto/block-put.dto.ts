import { Type } from 'class-transformer';
import { IsEnum, IsMongoId, ValidateNested } from 'class-validator';
import { Blocks } from 'src/database/schemas/block.schema';
import { Position } from 'src/database/schemas/position.schema';

export class BlockPutDto {
  @IsEnum(Blocks)
  type: Blocks;
  @ValidateNested()
  @Type(() => Position)
  position: Position;
  @IsMongoId()
  map: string;
}

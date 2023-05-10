import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { MapSettings } from 'src/database/schemas/mapSettings.schema';

export class MapUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;
  @ValidateNested()
  @Type(() => MapSettings)
  @IsOptional()
  settings?: MapSettings;
}

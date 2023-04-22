import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { MapSettings } from 'src/database/schemas/map-settings.schema';

export class MapUpdateDto {
  @IsString()
  name: string;
  @ValidateNested()
  @Type(() => MapSettings)
  settings: MapSettings;
}
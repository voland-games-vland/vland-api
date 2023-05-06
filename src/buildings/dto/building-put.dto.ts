import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, ValidateNested } from 'class-validator';
import { BuildingMetadataType } from 'src/database/schemas/building.schema';
import { BuildingMetadataCapturePoint } from 'src/database/schemas/buildingMetadataCapturePoint.schema';
import { BuildingMetadataPickup } from 'src/database/schemas/buildingMetadataPickup.schema';
import { BuildingMetadataSpawn } from 'src/database/schemas/buildingMetadataSpawn.schema';
import { BuildingMetadataSpawner } from 'src/database/schemas/buildingMetadataSpawner.schema';
import { BuildingMetadataTeleporter } from 'src/database/schemas/buildingMetadataTeleporter.schema';
import { Position } from 'src/database/schemas/position.schema';

export class BuildingPutDto {
  @ValidateNested()
  @Type(() => Position)
  position: Position;
  @IsMongoId()
  map: string;
  
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(BuildingMetadataSpawn) },
      { $ref: getSchemaPath(BuildingMetadataSpawner) },
      { $ref: getSchemaPath(BuildingMetadataTeleporter) },
      { $ref: getSchemaPath(BuildingMetadataCapturePoint) },
      { $ref: getSchemaPath(BuildingMetadataPickup) },
    ]
  })
  metadata: BuildingMetadataType
}

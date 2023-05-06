import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Position } from './position.schema';
import { BuildingMetadata } from './buildingMetadata.schema';
import { BuildingMetadataSpawner, BuildingMetadataSpawnerSchema } from './buildingMetadataSpawner.schema';
import { BuildingMetadataSpawn, BuildingMetadataSpawnSchema } from './buildingMetadataSpawn.schema';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { BuildingMetadataTeleporter, BuildingMetadataTeleporterSchema } from './buildingMetadataTeleporter.schema';
import { BuildingMetadataCapturePoint, BuildingMetadataCapturePointSchema } from './buildingMetadataCapturePoint.schema';
import { BuildingMetadataPickup, BuildingMetadataPickupSchema } from './buildingMetadataPickup.schema';

export type BuildingDocument = Building & Document;

export type BuildingMetadataType = BuildingMetadataSpawner | BuildingMetadataSpawn | BuildingMetadataTeleporter | BuildingMetadataCapturePoint | BuildingMetadataPickup

@Schema()
@ApiExtraModels(BuildingMetadataSpawner, BuildingMetadataSpawn, BuildingMetadataTeleporter, BuildingMetadataCapturePoint, BuildingMetadataPickup)
export class Building {
  _id: string;

  @Prop({ type: Position, required: true })
  position: Position;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Map' })
  map: string;

  @Prop({ required: true, type: BuildingMetadata })
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(BuildingMetadataSpawn) },
      { $ref: getSchemaPath(BuildingMetadataSpawner) },
      { $ref: getSchemaPath(BuildingMetadataTeleporter) },
      { $ref: getSchemaPath(BuildingMetadataCapturePoint) },
      { $ref: getSchemaPath(BuildingMetadataPickup) },
    ]
  })
  metadata: BuildingMetadataType;
}

export const BuildingSchema = SchemaFactory.createForClass(Building);

const subdocument = BuildingSchema.path('metadata') as MongooseSchema.Types.Subdocument

subdocument.discriminator('Spawner', BuildingMetadataSpawnerSchema)
subdocument.discriminator('Spawn', BuildingMetadataSpawnSchema)
subdocument.discriminator('Teleporter', BuildingMetadataTeleporterSchema)
subdocument.discriminator('CapturePoint', BuildingMetadataCapturePointSchema)
subdocument.discriminator('Pickup', BuildingMetadataPickupSchema)

BuildingSchema.index({ position: 1, map: 1 }, { unique: true });

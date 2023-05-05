import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Building } from "./buildingMetadata.schema";

@Schema({ _id: false })
export class BuildingMetadataSpawn {
    type: 'Spawn' = Building.Spawn

    @Prop()
    team?: number
}

export const BuildingMetadataSpawnSchema = SchemaFactory.createForClass(BuildingMetadataSpawn)
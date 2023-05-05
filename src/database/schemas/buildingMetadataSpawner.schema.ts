import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Building } from "./buildingMetadata.schema";

@Schema({ _id: false })
export class BuildingMetadataSpawner {
    type: 'Spawner' = Building.Spawner

    @Prop({ required: true})
    spawnRate: number

    /* // TODO: define which type of unit it spawns
    @Prop({ required: true})
    spawnUnitType: string
    */
}

export const BuildingMetadataSpawnerSchema = SchemaFactory.createForClass(BuildingMetadataSpawner)
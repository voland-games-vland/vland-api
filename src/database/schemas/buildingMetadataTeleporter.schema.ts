import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Building } from "./buildingMetadata.schema";
import { Position } from "./position.schema";

@Schema({ _id: false })
export class BuildingMetadataTeleporter {
    type: 'Teleporter' = Building.Teleporter

    @Prop()
    team?: number

    @Prop({ type: Position, required: true })
    teleportTo: Position;
}

export const BuildingMetadataTeleporterSchema = SchemaFactory.createForClass(BuildingMetadataTeleporter)
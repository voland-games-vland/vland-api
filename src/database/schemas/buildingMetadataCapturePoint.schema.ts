import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Building } from "./buildingMetadata.schema";
import { Position } from "./position.schema";

@Schema({ _id: false })
export class BuildingMetadataCapturePoint {
    type: 'CapturePoint' = Building.CapturePoint

    @Prop()
    team?: number
}

export const BuildingMetadataCapturePointSchema = SchemaFactory.createForClass(BuildingMetadataCapturePoint)
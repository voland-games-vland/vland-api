import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Building {
    Spawn = 'Spawn',
    CapturePoint = 'CapturePoint',
    Teleporter = 'Teleporter',
    Spawner = 'Spawner',
    Pickup = 'Pickup'
}

@Schema({
    _id: false,
    discriminatorKey: 'type'
})
export class BuildingMetadata {
    @Prop({
        type: String,
        enum: Building,
        required: true,
    })
    type: Building;
}

export const BuildingMetadataSchema = SchemaFactory.createForClass(BuildingMetadata)
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Building } from "./buildingMetadata.schema";

export enum Pickup {
    Health = 'Health',
    Armor = 'Armor',
    Energy = 'Energy',
}


@Schema({ _id: false })
export class BuildingMetadataPickup {
    type: 'Pickup' = Building.Pickup

    @Prop({
        type: String,
        enum: Pickup,
        required: true,
        default: Pickup.Health
    })
    typePickup: Pickup;

    @Prop({ required: true })
    amount: number

    @Prop({ required: true })
    health: number

    @Prop()
    team?: number

    @Prop()
    respawnTime?: number
}

export const BuildingMetadataPickupSchema = SchemaFactory.createForClass(BuildingMetadataPickup)
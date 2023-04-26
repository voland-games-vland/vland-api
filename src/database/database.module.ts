import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from './schemas/block.schema';
import { Building, BuildingSchema } from './schemas/building.schema';
import { Map, MapSchema } from './schemas/map.schema';
import { User, UserSchema } from './schemas/user.schema';
import { Money, MoneySchema } from './schemas/money.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongodb.uri'),
        dbName: configService.get<string>('database.mongodb.name'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: Map.name,
        schema: MapSchema,
      },
      {
        name: Block.name,
        schema: BlockSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Building.name,
        schema: BuildingSchema,
      },
      {
        name: Money.name,
        schema: MoneySchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}

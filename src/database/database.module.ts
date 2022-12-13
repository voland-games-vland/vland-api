import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Map, MapSchema } from './schemas/map.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongodb.uri'),
        dbName: configService.get<string>('database.mongodb.name')
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
        {
            name: Map.name, schema: MapSchema
        }
    ])
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { MapsModule } from './maps/maps.module';
import { BlocksModule } from './blocks/blocks.module';
import { UsersModule } from './users/users.module';
import { BearerStrategy } from './guards/bearer.guard';
import { AnonymousStrategy } from './guards/anonymous.guard';
import { BuildingsModule } from './buildings/buildings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    DatabaseModule,
    MapsModule,
    BlocksModule,
    UsersModule,
    BuildingsModule,
  ],
  controllers: [AppController],
  providers: [BearerStrategy, AnonymousStrategy],
})
export class AppModule {}

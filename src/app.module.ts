import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { MapsModule } from './maps/maps.module';
import { BlocksModule } from './blocks/blocks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    DatabaseModule,
    MapsModule,
    BlocksModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

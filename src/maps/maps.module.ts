import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';
import { DatabaseModule } from 'src/database/database.module';
import { BlocksModule } from 'src/blocks/blocks.module';

@Module({
  imports: [DatabaseModule, BlocksModule],
  controllers: [MapsController],
  providers: [MapsService],
})
export class MapsModule {}

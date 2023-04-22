import { forwardRef, Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';
import { DatabaseModule } from 'src/database/database.module';
import { BlocksModule } from 'src/blocks/blocks.module';
import { UsersModule } from 'src/users/users.module';
import { BuildingsModule } from 'src/buildings/buildings.module';

@Module({
  imports: [
    DatabaseModule,
    BlocksModule,
    BuildingsModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [MapsController],
  providers: [MapsService],
  exports: [MapsService],
})
export class MapsModule {}

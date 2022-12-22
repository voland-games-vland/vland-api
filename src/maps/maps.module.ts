import { forwardRef, Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';
import { DatabaseModule } from 'src/database/database.module';
import { BlocksModule } from 'src/blocks/blocks.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, BlocksModule, forwardRef(() => UsersModule)],
  controllers: [MapsController],
  providers: [MapsService],
  exports: [MapsService],
})
export class MapsModule {}

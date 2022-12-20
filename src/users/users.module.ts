import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MapsModule } from 'src/maps/maps.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, MapsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

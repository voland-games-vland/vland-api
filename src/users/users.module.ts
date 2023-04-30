import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MapsModule } from 'src/maps/maps.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CharactersModule } from 'src/characters/character.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => MapsModule),
    forwardRef(() => CharactersModule)
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

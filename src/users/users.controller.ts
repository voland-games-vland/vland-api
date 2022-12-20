import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Map } from 'src/database/schemas/map.schema';
import { User } from 'src/database/schemas/user.schema';
import { UserData } from 'src/decorators/user.decorator';
import { BearerGuard } from 'src/guards/bearer.guard';
import { FirebaseUser } from 'src/guards/firebaseUser.type';
import { MapsService } from 'src/maps/maps.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly mapsService: MapsService) {}

  @Get('me')
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Firebase Authentication')
  async getMe(@UserData() user: FirebaseUser) {
    const userMe = await this.usersService.getUserByUid(user.uid);
    return userMe as User;
  }

  @Get(':id/maps')
  async getMeMaps(@Param('id') id: string) {
    const maps = await this.mapsService.findAll({
        owner: id
    })
    return maps as Map[];
  }
}

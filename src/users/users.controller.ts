import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Map } from 'src/database/schemas/map.schema';
import { User } from 'src/database/schemas/user.schema';
import { UserData } from 'src/decorators/user.decorator';
import { BearerGuard } from 'src/guards/bearer.guard';
import { FirebaseUser } from 'src/guards/firebaseUser.type';
import { MapsService } from 'src/maps/maps.service';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { UsersService } from './users.service';
import { Money } from 'src/database/schemas/money.schema';
import { UserNicknamePut } from './dto/user-nickname-put.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mapsService: MapsService,
  ) {}

  @Get('me')
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Firebase Authentication')
  async getMe(@UserData() user: FirebaseUser) {
    const userMe = await this.usersService.getUserByUid(user.uid);
    return userMe as User;
  }

  @Get('me/money')
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Firebase Authentication')
  async getMeMoney(@UserData() user: FirebaseUser) {
    const money = await this.usersService.getMoneyByUid(user.uid);
    return money as Money;
  }

  @Put('me/nickname')
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Firebase Authentication')
  async putMeName(
    @Body() userNicknamePut: UserNicknamePut,
    @UserData() user: FirebaseUser,
  ) {
    const userMe = await this.usersService.updateUserNicknameByUid(
      user.uid,
      userNicknamePut.nickname,
    );
    return userMe as User;
  }

  @Get(':id/maps')
  async getMeMaps(@Param('id', ParseObjectIdPipe) id: string) {
    const maps = await this.mapsService.findAll({
      owner: id,
    });
    return maps as Map[];
  }
}

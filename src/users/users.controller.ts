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
import { UserNicknamePutDto } from './dto/user-nickname-put.dto';
import { CharactersService } from 'src/characters/character.service';
import { Character } from 'src/database/schemas/character.schema';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mapsService: MapsService,
    private readonly charactersService: CharactersService
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
    @Body() userNicknamePutDto: UserNicknamePutDto,
    @UserData() user: FirebaseUser,
  ) {
    const userMe = await this.usersService.updateUserNicknameByUid(
      user.uid,
      userNicknamePutDto.nickname,
    );
    return userMe as User;
  }

  @Get(':id/maps')
  async getUserMaps(@Param('id', ParseObjectIdPipe) id: string) {
    const maps = await this.mapsService.findAll({
      owner: id,
    });
    return maps as Map[];
  }

  @Get(':id/characters')
  async getUserCharacters(@Param('id', ParseObjectIdPipe) id: string) {
    const characters = await this.charactersService.findAll({
      userId: id
    })
    return characters as Character[]
  }
}

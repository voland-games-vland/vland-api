import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BlocksService } from 'src/blocks/blocks.service';
import { Map } from 'src/database/schemas/map.schema';
import { UserData } from 'src/decorators/user.decorator';
import { BearerGuard } from 'src/guards/bearer.guard';
import { FirebaseUser } from 'src/guards/firebaseUser.type';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { UsersService } from 'src/users/users.service';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(
    private readonly mapsService: MapsService,
    private readonly blocksService: BlocksService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Firebase Authentication')
  async create(@UserData() firebaseUser: FirebaseUser, @Body() createMapDto: CreateMapDto) {
    const user = await this.usersService.getUserByUid(firebaseUser.uid)
    return (await this.mapsService.create(createMapDto, user._id)) as Map;
  }

  @Get()
  async findAll() {
    return (await this.mapsService.findAll()) as Map[];
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return (await this.mapsService.findOne(id)) as Map;
  }

  @Patch(':id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateMapDto: UpdateMapDto) {
    return (await this.mapsService.update(id, updateMapDto)) as Map;
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return (await this.mapsService.remove(id)) as Map;
  }

  @Get(':id/blocks')
  async getBlocks(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.blocksService.findAll({
      map: id,
    });
  }
}

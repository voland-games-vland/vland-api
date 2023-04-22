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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BlocksService } from 'src/blocks/blocks.service';
import { Block } from 'src/database/schemas/block.schema';
import { Map } from 'src/database/schemas/map.schema';
import { UserData } from 'src/decorators/user.decorator';
import { BearerGuard } from 'src/guards/bearer.guard';
import { FirebaseUser } from 'src/guards/firebaseUser.type';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { UsersService } from 'src/users/users.service';
import { MapCreateDto } from './dto/map-create.dto';
import { MapUpdateDto } from './dto/map-update.dto';
import { MapsService } from './maps.service';
import { BuildingsService } from 'src/buildings/buildings.service';
import { Building } from 'src/database/schemas/building.schema';

@ApiTags('maps')
@Controller('maps')
export class MapsController {
  constructor(
    private readonly mapsService: MapsService,
    private readonly blocksService: BlocksService,
    private readonly usersService: UsersService,
    private readonly buildingsService: BuildingsService,
  ) {}

  @Post()
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Firebase Authentication')
  async create(
    @UserData() firebaseUser: FirebaseUser,
    @Body() mapCreateDto: MapCreateDto,
  ) {
    const user = await this.usersService.getUserByUid(firebaseUser.uid);
    return (await this.mapsService.create(mapCreateDto, user._id)) as Map;
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
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() mapUpdateDto: MapUpdateDto,
  ) {
    return (await this.mapsService.update(id, mapUpdateDto)) as Map;
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return (await this.mapsService.remove(id)) as Map;
  }

  @Get(':id/blocks')
  async getBlocks(@Param('id', ParseObjectIdPipe) id: string) {
    return (await this.blocksService.findAll({
      map: id,
    })) as Block[];
  }

  @Get(':id/buildings')
  async getBuildings(@Param('id', ParseObjectIdPipe) id: string) {
    return (await this.buildingsService.findAll({
      map: id,
    })) as Building[];
  }
}

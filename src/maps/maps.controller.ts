import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlocksService } from 'src/blocks/blocks.service';
import { Map } from 'src/database/schemas/map.schema';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(
    private readonly mapsService: MapsService,
    private readonly blocksService: BlocksService,
  ) {}

  @Post()
  async create(@Body() createMapDto: CreateMapDto) {
    return (await this.mapsService.create(createMapDto)) as Map;
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

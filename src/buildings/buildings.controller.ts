import { Controller, Body, Delete } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { BuildingsService } from './buildings.service';
import { Building } from 'src/database/schemas/building.schema';
import { BuildingPutDto } from './dto/building-put.dto';
import { BuildingDeleteDto } from './dto/building-delete.dto';

@ApiTags('buildings')
@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Put()
  async put(@Body() buildingPutDto: BuildingPutDto) {
    const building = await this.buildingsService.put(buildingPutDto);
    return building as Building;
  }

  @Delete()
  async delete(@Body() buildingDeleteDto: BuildingDeleteDto) {
    return await this.buildingsService.remove(buildingDeleteDto);
  }
}

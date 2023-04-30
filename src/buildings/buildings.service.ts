import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Map, MapDocument } from 'src/database/schemas/map.schema';
import { Position } from 'src/database/schemas/position.schema';
import {
  Building,
  BuildingDocument,
} from 'src/database/schemas/building.schema';
import { BuildingPutDto } from './dto/building-put.dto';
import { BuildingDeleteDto } from './dto/building-delete.dto';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectModel(Building.name)
    private readonly buildingModel: Model<BuildingDocument>,
    @InjectModel(Map.name)
    private readonly mapModel: Model<MapDocument>,
  ) {}

  async put(buildingPutDto: BuildingPutDto) {
    const map = await this.mapModel.findById(buildingPutDto.map).exec();
    if (!map) throw Error('Map not Found');

    const building = await this.buildingModel
      .findOne({
        map: buildingPutDto.map,
        'position.x': buildingPutDto.position.x,
        'position.y': buildingPutDto.position.y,
        'position.z': buildingPutDto.position.z,
      })
      .exec();
    if (building) {
      building.type = buildingPutDto.type;
      building.position.x = buildingPutDto.position.x;
      building.position.y = buildingPutDto.position.y;
      building.position.z = buildingPutDto.position.z;
      return await building.save();
    }

    const newBlock = new this.buildingModel();
    newBlock.type = buildingPutDto.type;
    newBlock.position = new Position();
    newBlock.position.x = buildingPutDto.position.x;
    newBlock.position.y = buildingPutDto.position.y;
    newBlock.position.z = buildingPutDto.position.z;
    newBlock.map = map._id;
    return await newBlock.save();
  }

  async findAll(query: FilterQuery<BuildingDocument> = {}) {
    return await this.buildingModel.find(query).exec();
  }

  async remove(buildingDeleteDto: BuildingDeleteDto) {
    return await this.buildingModel
      .findOneAndRemove({
        map: buildingDeleteDto.map,
        'position.x': buildingDeleteDto.position.x,
        'position.y': buildingDeleteDto.position.y,
        'position.z': buildingDeleteDto.position.z,
      })
      .exec();
  }
}

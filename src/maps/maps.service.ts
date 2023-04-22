import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Block, BlockDocument } from 'src/database/schemas/block.schema';
import { Map, MapDocument } from 'src/database/schemas/map.schema';
import { MapCreateDto, Size } from './dto/map-create.dto';
import { MapUpdateDto } from './dto/map-update.dto';

@Injectable()
export class MapsService {
  constructor(
    @InjectModel(Map.name)
    private readonly mapModel: Model<MapDocument>,

    @InjectModel(Block.name)
    private readonly blockModel: Model<BlockDocument>,
  ) {}

  async create(mapCreateDto: MapCreateDto, owner?: string) {
    const newMap = new this.mapModel(mapCreateDto);
    switch (mapCreateDto.size) {
      case Size.XS: {
        newMap.width = 15;
        newMap.height = 9;
        break;
      }
      case Size.S: {
        newMap.width = 31;
        newMap.height = 21;
        break;
      }
      case Size.M: {
        newMap.width = 45;
        newMap.height = 31;
        break;
      }
      case Size.L: {
        newMap.width = 61;
        newMap.height = 41;
        break;
      }
      case Size.XL: {
        newMap.width = 75;
        newMap.height = 51;
        break;
      }
    }
    newMap.owner = owner;
    return await newMap.save();
  }

  async findAll(query: FilterQuery<MapDocument> = {}) {
    return await this.mapModel.find(query).exec();
  }

  async findOne(id: string) {
    return await this.mapModel.findById(id).exec();
  }

  async update(id: string, mapUpdateDto: MapUpdateDto) {
    return await this.mapModel.findByIdAndUpdate(id, mapUpdateDto, {
      new: true,
    });
  }

  async remove(id: string) {
    await this.blockModel.deleteMany({
      map: id,
    });
    return await this.mapModel.findByIdAndRemove(id);
  }
}

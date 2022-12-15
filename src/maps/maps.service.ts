import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Block, BlockDocument } from 'src/database/schemas/block.schema';
import { Map, MapDocument } from 'src/database/schemas/map.schema';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';

@Injectable()
export class MapsService {
  constructor(
    @InjectModel(Map.name)
    private readonly mapModel: Model<MapDocument>,

    @InjectModel(Block.name)
    private readonly blockModel: Model<BlockDocument>,
  ) {}

  async create(createMapDto: CreateMapDto) {
    return await new this.mapModel(createMapDto).save();
  }

  async findAll(query: FilterQuery<MapDocument> = {}) {
    return await this.mapModel.find(query).exec();
  }

  async findOne(id: string) {
    return await this.mapModel
      .findById(id, null, {
        populate: 'blocks',
      })
      .exec();
  }

  async update(id: string, updateMapDto: UpdateMapDto) {
    return await this.mapModel.findByIdAndUpdate(id, updateMapDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.mapModel.findByIdAndRemove(id);
  }
}

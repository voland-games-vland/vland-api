import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Block, BlockDocument } from 'src/database/schemas/block.schema';
import { Map, MapDocument } from 'src/database/schemas/map.schema';
import { Position } from 'src/database/schemas/position.schema';

@Injectable()
export class BlocksService {
  constructor(
    @InjectModel(Block.name)
    private readonly blockModel: Model<BlockDocument>,
    @InjectModel(Map.name)
    private readonly mapModel: Model<MapDocument>
  ) {}

  async create() {
    const block = new this.blockModel()
    block.map = await this.mapModel.findById('639938cdfa1da8635e28e91c').exec()
    block.position = new Position()
    block.position.x = 0
    block.position.y = 1
    block.position.z = 0
    return await block.save();
  }

  async findAll(query: FilterQuery<BlockDocument> = {}) {
    return await this.blockModel.find(query).exec();
  }

  async findOne(id: string) {
    return await this.blockModel
      .findById(id, null, {
        populate: 'blocks',
      })
      .exec();
  }

  async remove(id: string) {
    return await this.blockModel.findByIdAndRemove(id);
  }
}

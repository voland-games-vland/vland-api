import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Block, BlockDocument } from 'src/database/schemas/block.schema';
import { Map, MapDocument } from 'src/database/schemas/map.schema';
import { Position } from 'src/database/schemas/position.schema';
import { DeleteBlockDto } from './dto/delete-block.dto';
import { PutBlockDto } from './dto/put-block.dto';

@Injectable()
export class BlocksService {
  constructor(
    @InjectModel(Block.name)
    private readonly blockModel: Model<BlockDocument>,
    @InjectModel(Map.name)
    private readonly mapModel: Model<MapDocument>,
  ) {}

  async put(putBlockDto: PutBlockDto) {
    const map = await this.mapModel.findById(putBlockDto.mapId).exec();
    if (!map) throw Error('Map not Found');

    const block = await this.blockModel
      .findOne({
        map: putBlockDto.mapId,
        'position.x': putBlockDto.position.x,
        'position.y': putBlockDto.position.y,
        'position.z': putBlockDto.position.z,
      })
      .exec();
    if (block) {
      block.type = putBlockDto.type;
      block.position.x = putBlockDto.position.x;
      block.position.y = putBlockDto.position.y;
      block.position.z = putBlockDto.position.z;
      return await block.save();
    }

    const newBlock = new this.blockModel();
    newBlock.type = putBlockDto.type;
    newBlock.position = new Position();
    newBlock.position.x = putBlockDto.position.x;
    newBlock.position.y = putBlockDto.position.y;
    newBlock.position.z = putBlockDto.position.z;
    newBlock.map = map;
    return await newBlock.save();
  }

  async findAll(query: FilterQuery<BlockDocument> = {}) {
    return await this.blockModel.find(query).exec();
  }

  async remove(deleteBlockDto: DeleteBlockDto) {
    return await this.blockModel
      .findOneAndRemove({
        map: deleteBlockDto.mapId,
        'position.x': deleteBlockDto.position.x,
        'position.y': deleteBlockDto.position.y,
        'position.z': deleteBlockDto.position.z,
      })
      .exec();
  }
}

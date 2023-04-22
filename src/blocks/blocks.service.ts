import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Block, BlockDocument } from 'src/database/schemas/block.schema';
import { Map, MapDocument } from 'src/database/schemas/map.schema';
import { Position } from 'src/database/schemas/position.schema';
import { BlockDeleteDto } from './dto/block-delete.dto';
import { BlockPutDto } from './dto/block-put.dto';

@Injectable()
export class BlocksService {
  constructor(
    @InjectModel(Block.name)
    private readonly blockModel: Model<BlockDocument>,
    @InjectModel(Map.name)
    private readonly mapModel: Model<MapDocument>,
  ) {}

  async put(blockPutDto: BlockPutDto) {
    const map = await this.mapModel.findById(blockPutDto.map).exec();
    if (!map) throw Error('Map not Found');

    const block = await this.blockModel
      .findOne({
        map: blockPutDto.map,
        'position.x': blockPutDto.position.x,
        'position.y': blockPutDto.position.y,
        'position.z': blockPutDto.position.z,
      })
      .exec();
    if (block) {
      block.type = blockPutDto.type;
      block.position.x = blockPutDto.position.x;
      block.position.y = blockPutDto.position.y;
      block.position.z = blockPutDto.position.z;
      return await block.save();
    }

    const newBlock = new this.blockModel();
    newBlock.type = blockPutDto.type;
    newBlock.position = new Position();
    newBlock.position.x = blockPutDto.position.x;
    newBlock.position.y = blockPutDto.position.y;
    newBlock.position.z = blockPutDto.position.z;
    newBlock.map = map._id;
    return await newBlock.save();
  }

  async findAll(query: FilterQuery<BlockDocument> = {}) {
    return await this.blockModel.find(query).exec();
  }

  async remove(blockDeleteDto: BlockDeleteDto) {
    return await this.blockModel
      .findOneAndRemove({
        map: blockDeleteDto.map,
        'position.x': blockDeleteDto.position.x,
        'position.y': blockDeleteDto.position.y,
        'position.z': blockDeleteDto.position.z,
      })
      .exec();
  }
}

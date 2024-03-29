import { Controller, Body, Delete } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { Block } from 'src/database/schemas/block.schema';
import { BlocksService } from './blocks.service';
import { BlockDeleteDto } from './dto/block-delete.dto';
import { BlockPutDto } from './dto/block-put.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('blocks')
@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Put()
  async put(@Body() blockPutDto: BlockPutDto) {
    const block = await this.blocksService.put(blockPutDto);
    return block as Block;
  }

  @Delete()
  async delete(@Body() blockDeleteDto: BlockDeleteDto) {
    return await this.blocksService.remove(blockDeleteDto);
  }
}

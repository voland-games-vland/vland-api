import { Controller, Body, Delete } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { Block } from 'src/database/schemas/block.schema';
import { BlocksService } from './blocks.service';
import { DeleteBlockDto } from './dto/delete-block.dto';
import { PutBlockDto } from './dto/put-block.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('blocks')
@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Put()
  async put(@Body() putBlockDto: PutBlockDto) {
    const block = await this.blocksService.put(putBlockDto);
    return block as Block;
  }

  @Delete()
  async delete(@Body() deleteBlockDto: DeleteBlockDto) {
    return await this.blocksService.remove(deleteBlockDto);
  }
}

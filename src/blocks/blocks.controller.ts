import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { Block } from 'src/database/schemas/block.schema';
import { BlocksService } from './blocks.service';

@Controller('blocks')
export class BlocksController {
    constructor(private readonly blocksService: BlocksService) { }

    @Post()
    async create() {
        return (await this.blocksService.create()) as Block;
    }
}

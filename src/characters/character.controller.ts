import {
  Controller,
  Post,
  Patch,
  UseGuards,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CharactersService } from './character.service';
import { BearerGuard } from 'src/guards/bearer.guard';
import { UserData } from 'src/decorators/user.decorator';
import { FirebaseUser } from 'src/guards/firebaseUser.type';
import { CharacterCreateDto } from './dto/character-create.dto';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { CharacterPatchDto } from './dto/character-patch.dto';
import { UsersService } from 'src/users/users.service';
import { Character } from 'src/database/schemas/character.schema';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly charactersService: CharactersService,
  ) {}

  @Post()
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Firebase Authentication')
  async create(
    @UserData() firebaseUser: FirebaseUser,
    @Body() characterCreateDto: CharacterCreateDto,
  ) {
    const user = await this.usersService.getUserByUid(firebaseUser.uid);
    const character = await this.charactersService.create(
      characterCreateDto,
      user._id,
    );
    return character as Character;
  }

  @Get(':id')
  async get(@Param('id', ParseObjectIdPipe) id: string) {
    const character = await this.charactersService.findOne(id);
    return character as Character;
  }

  @Patch(':id')
  async patch(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() characterPatchDto: CharacterPatchDto,
  ) {
    const character = await this.charactersService.update(
      id,
      characterPatchDto,
    );
    return character as Character;
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    const character = await this.charactersService.remove(id);
    return character as Character;
  }
}

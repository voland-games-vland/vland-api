import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  Character,
  CharacterDocument,
} from 'src/database/schemas/character.schema';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<CharacterDocument>,
  ) {}

  async create(characterCreateDto, userId?: string) {
    const newCharacter = new this.characterModel(characterCreateDto);
    newCharacter.userId = userId;
    return await newCharacter.save();
  }

  async findAll(query: FilterQuery<CharacterDocument> = {}) {
    return await this.characterModel.find(query).exec();
  }

  async findOne(id: string) {
    return await this.characterModel.findById(id).exec();
  }

  async update(id: string, characterPatchDto) {
    return await this.characterModel.findByIdAndUpdate(id, characterPatchDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.characterModel.findByIdAndRemove(id);
  }
}

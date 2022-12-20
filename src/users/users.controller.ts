import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/database/schemas/user.schema';
import { UserData } from 'src/decorators/user.decorator';
import { BearerGuard } from 'src/guards/bearer.guard';
import { FirebaseUser } from 'src/guards/firebaseUser.type';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(BearerGuard)
  async getMe(@UserData() user: FirebaseUser) {
    const userMe = await this.usersService.getUserByUid(user.uid);
    return userMe as User;
  }
}

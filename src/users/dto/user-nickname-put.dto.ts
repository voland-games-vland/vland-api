import { IsEnum, IsString, Length } from 'class-validator';

export class UserNicknamePut {
  @IsString()
  @Length(3, 26)
  nickname: string;
}

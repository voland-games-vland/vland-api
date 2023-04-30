import { IsString, Length } from 'class-validator';

export class UserNicknamePut {
  @IsString()
  @Length(3, 30)
  nickname: string;
}

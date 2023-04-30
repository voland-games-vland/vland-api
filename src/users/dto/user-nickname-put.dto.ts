import { IsString, Length } from 'class-validator';

export class UserNicknamePutDto {
  @IsString()
  @Length(3, 30)
  nickname: string;
}

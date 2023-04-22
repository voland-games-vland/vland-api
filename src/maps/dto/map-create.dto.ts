import { IsEnum, IsString } from 'class-validator';
export enum Size {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export class MapCreateDto {
  @IsString()
  name: string;
  @IsEnum(Size)
  size: Size = Size.M;
}

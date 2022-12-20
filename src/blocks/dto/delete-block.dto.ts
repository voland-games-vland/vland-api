import { Position } from 'src/database/schemas/position.schema';

export class DeleteBlockDto {
  position: Position;
  mapId: string;
}

import { Blocks } from "src/database/schemas/block.schema";
import { Position } from "src/database/schemas/position.schema";

export class PutBlockDto {
    type: Blocks;
    position: Position;
    mapId: string
}
  
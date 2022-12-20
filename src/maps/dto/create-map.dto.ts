export class CreateMapDto {
  name: string;
  settings?: {
    teams?: number
    scoreToWin?: number
    timeLimitInSeconds?: number
  }
}

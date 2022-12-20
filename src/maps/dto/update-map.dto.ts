export class UpdateMapDto {
  name: string
  settings: {
    teams: number
    scoreToWin: number
    timeLimitInSeconds: number
  }
}

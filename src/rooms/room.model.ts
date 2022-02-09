import { Player } from "./player.model";

export interface Room {
  id: string,
  roomNumber: number,
  players: Player[]
}
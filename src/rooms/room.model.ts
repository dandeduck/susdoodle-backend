import { Player } from "./player.model";
import { RoomConfiguration } from "./roomConfiguration.model";

export interface Room {
  id: string,
  roomNumber: number,
  players: Player[],
  config: RoomConfiguration
}
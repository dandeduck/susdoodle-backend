import { Player } from "src/rooms/player.model";
import { Room } from "src/rooms/room.model";
import { Socket } from "socket.io";
import { HttpException, HttpStatus } from "@nestjs/common";

export class GameHandler {
  private room: Room;
  private playerSockets = new Map<Player, Socket>();

  constructor(room: Room) {
    this.room = room;
  }

  addPlayer(player: Player, client: Socket) {
    if (this.room.players.filter(p => p.id === player.id).length > 0)
      this.playerSockets.set(player, client)
    else
      throw new HttpException("Player is not a member in given room", HttpStatus.FORBIDDEN);
    }
  }
import { HttpException } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, MessageBody } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Player } from 'src/rooms/player.model';
import { Room } from 'src/rooms/room.model';
import { RoomsService } from 'src/rooms/rooms.service';
import { GameHandler } from './gameHandler';

@WebSocketGateway(4001)
export class GameGateway {
  private gameHandlers = new Map<Room, GameHandler>();

  constructor(private readonly roomsService: RoomsService) {}

  @SubscribeMessage('join')
  handleMessage(client: Socket, @MessageBody('player') player: Player, @MessageBody('room') roomIdentifier: string | number) {
    try {
      const room = this.roomsService.getRoom(roomIdentifier);
  
      if (this.gameHandlers.has(room))
        this.gameHandlers.get(room).addPlayer(player, client);
      else {
        this.gameHandlers
          .set(room, new GameHandler(room))
          .get(room).addPlayer(player, client);
      }
    } catch(e) {
      return e;
    }
  }
}

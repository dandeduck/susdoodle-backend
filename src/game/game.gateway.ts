import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, MessageBody } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Player } from 'src/rooms/player.model';
import { Room } from 'src/rooms/room.model';
import { RoomsService } from 'src/rooms/rooms.service';
import { GameHandler } from './gameHandler';

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection {
  private gameHandlers = new Map<Room, GameHandler>();

  constructor(private readonly roomsService: RoomsService) {}

  handleConnection(client: Socket, ...args: any[]) {
    const roomIdentifier = args[1];
    const player: Player = args[0];
    const room = this.roomsService.getRoom(roomIdentifier);

    if (this.gameHandlers.has(room))
      this.gameHandlers.get(room).addPlayer(player, client);
    else {
      this.gameHandlers
        .set(room, new GameHandler(room))
        .get(room).addPlayer(player, client);
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}

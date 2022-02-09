import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Player } from './player.model';
import { Room } from './room.model';
import { RoomConfiguration } from './roomConfiguration.model';

@Injectable()
export class RoomsService {
  private MAX_ROOM_COUNT = 1000;
  private rooms = new Map<number, Room>();
  private roomIds = new Map<string, number>();

  getOpenRooms() {
    
  }

  removePlayer(roomNumber: number, player: Player) {
    if (this.rooms.has(roomNumber))
      this.removePlayerFromRoom(this.rooms.get(roomNumber), player);
    else
      throw new HttpException("Room by this number doesn't exist", HttpStatus.BAD_REQUEST);
  }

  private removePlayerFromRoom(room: Room, player: Player) {
    const index = room.players.indexOf(player);
      if (index > -1) {
        room.players.splice(index, 1);
      }
  }

  addPlayer(player: Player, id?: string, roomNumber?: number) {
    if (id)
      roomNumber = this.roomIds.get(id);

    if (roomNumber && this.rooms.has(roomNumber)) {
      const room = this.rooms.get(roomNumber);

      if (room.config.size <= room.players.length)
        throw new HttpException("The room is full", HttpStatus.FORBIDDEN);

      room.players.push(player);

      return room;
    }
    else
      throw new HttpException("Room by this number doesn't exist", HttpStatus.BAD_REQUEST);
  }

  closeRoom(roomNumber: number) {
    this.roomIds.delete(this.rooms.get(roomNumber).id);
    this.rooms.delete(roomNumber);
  }

  createNewRoom(creator: Player, config: RoomConfiguration) {
    if (this.rooms.keys.length >= this.MAX_ROOM_COUNT)
      throw new HttpException('Maximum amount of rooms reached', HttpStatus.SERVICE_UNAVAILABLE);

    const room = {
      id: randomUUID(),
      roomNumber: this.generateNewRoomNumber(),
      players: [creator],
      config: config
    };

    this.rooms.set(room.roomNumber, room);
    this.roomIds.set(room.id, room.roomNumber);

    return room;
  }

  private generateNewRoomNumber() {
    let roomNumber = 0;

    do {
      roomNumber = Math.floor(100000 + Math.random() * 900000);
    } while(this.rooms.has(roomNumber));

    return roomNumber;
  }
}

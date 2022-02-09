import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Player } from './player.model';
import { Room } from './room.model';
import { RoomConfiguration } from './roomConfiguration.model';

@Injectable()
export class RoomsService {
  private MAX_ROOM_COUNT = 1000;
  private rooms = new Map<number, Room>();

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

  addPlayer(roomNumber: number, player: Player) {
    if (this.rooms.has(roomNumber))
      this.rooms.get(roomNumber).players.push(player);
    else
      throw new HttpException("Room by this number doesn't exist", HttpStatus.BAD_REQUEST);
  }

  closeRoom(roomNumber: number) {
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

    return room;
  }

  private generateNewRoomNumber() {
    let roomNumber;

    do {
      roomNumber = Math.floor(100000 + Math.random() * 900000);
    } while(this.rooms.has(roomNumber));

    return roomNumber;
  }
}

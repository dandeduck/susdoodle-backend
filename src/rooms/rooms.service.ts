import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Player } from './player.model';
import { Room } from './room.model';
import { RoomConfiguration } from './roomConfiguration.model';

@Injectable()
export class RoomsService {
  private MAX_ROOM_COUNT = 1000;
  private rooms = new Map<string, Room>();
  private roomIds = new Map<number, string>();

  getRoom(id: string | number): Room;
  getRoom(id: string): Room;
  getRoom(roomNumber: number): Room;

  getRoom(id: any): Room {
    if (typeof(id) === 'number')
      id = this.roomIds.get(id);

    if (id && this.rooms.has(id))
      return this.rooms.get(id);

    console.log([this.rooms.keys][0], id)

    throw new HttpException("Room by this id doesn't exist", HttpStatus.BAD_REQUEST);
  }

  joinOpenRoom(player: Player) {
    const room = this.getOpenRoom();

    if (room)
      return this.addPlayer(player, room.id);
    
    return new HttpException("There are currently no open rooms", HttpStatus.NOT_FOUND);
  }

  private getOpenRoom() {
    return [...this.rooms.values()]
      .filter(room => room.config.isOpen && room.players.length < room.config.size)
      .sort(() => 0.5 - Math.random())[0];
  }

  removePlayer(player: Player, roomNumber?: number, id?: string) {
    if (roomNumber)
      id = this.roomIds.get(roomNumber);

    if (id && this.rooms.has(id))
      this.removePlayerFromRoom(this.rooms.get(id), player);
    else
      throw new HttpException("Room by this number doesn't exist", HttpStatus.BAD_REQUEST);
  }

  private removePlayerFromRoom(room: Room, player: Player) {
    const foundPlayer = room.players.filter(p => p.id === player.id)[0];
    const index = room.players.indexOf(foundPlayer);
      if (index > -1) {
        room.players.splice(index, 1);
      }
  }

  addPlayer(player: Player, id?: string, roomNumber?: number) {
    if (roomNumber)
      id = this.roomIds.get(roomNumber);

    if (id && this.rooms.has(id)) {
      const room = this.rooms.get(id);

      if (room.config.size <= room.players.length)
        throw new HttpException("The room is full", HttpStatus.FORBIDDEN);

      room.players.push(player);

      return room;
    }

    throw new HttpException("Room by this number/id doesn't exist", HttpStatus.BAD_REQUEST);
  }

  closeRoom(roomNumber?: number, id?: string) {
    if (roomNumber)
      id = this.roomIds.get(roomNumber);
    
    if (id) {
      this.roomIds.delete(this.rooms.get(id).roomNumber);
      this.rooms.delete(id);
    }

    else
      throw new HttpException("Room by this number/id doesn't exist", HttpStatus.BAD_REQUEST);
  }

  createNewRoom(config: RoomConfiguration) {
    if (this.rooms.keys.length >= this.MAX_ROOM_COUNT)
      throw new HttpException('Maximum amount of rooms reached', HttpStatus.SERVICE_UNAVAILABLE);

    const room = {
      id: randomUUID(),
      roomNumber: this.generateNewRoomNumber(),
      players: [],
      config: config
    };

    this.rooms.set(room.id, room);
    this.roomIds.set(room.roomNumber, room.id);

    return room;
  }

  private generateNewRoomNumber() {
    let roomNumber = 0;

    do {
      roomNumber = Math.floor(100000 + Math.random() * 900000);
    } while(this.roomIds.has(roomNumber));

    return roomNumber;
  }
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WordsService } from 'src/words/words.service';
import { Player } from './player.model';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService, private readonly wordsService: WordsService){}

  @Post('join')
  @UseGuards(AuthGuard('api-key'))
  joinRoom(@Body('player') player: Player, @Body('id') id?: string, @Body('number') roomNumber?: number) {
    return this.roomsService.addPlayer(player, id, roomNumber);
  }

  @Post('new')
  @UseGuards(AuthGuard('api-key'))
  async createRoom(@Body('creator') creator: Player, @Body('config') config: {isOpen: boolean, size: number, doodleTime: number, length: number, categories: string[]}) {
    const wordAmount = config.length * 2;
    const words = await this.wordsService.getWordsFromAll(wordAmount, config.categories);
    const completedConfig = {
      words: words,
      size: config.size,
      isOpen: config.isOpen,
      doodleTime: config.doodleTime
    }

    return this.roomsService.createNewRoom(creator, completedConfig);
  }
}

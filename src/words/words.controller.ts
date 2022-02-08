import { BadRequestException, Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Post()
  addWords(@Body('words') words: {word: string, category: string}[]) {
    if (words && words.length > 0)
      words.forEach(word => this.wordsService.addWord(word.word, word.category));

    else
      throw new BadRequestException();
  }
}

import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
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

  @Get()
  getWords(@Body('amount') amount: number, @Body('categories') categories: string[]) {
    if (categories && categories.length > 0 && amount > 0)
      return this.wordsService.getWordsFromAll(amount, categories);

    else
      throw new BadRequestException();
  }
}

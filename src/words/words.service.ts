import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordEntity } from './word.entity';
import { Word } from './word.interface';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>
  ) {}

  addWord(word: Word) {
    return this.wordRepository.save(word);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityWord } from './models/activityWord.entity';
import { AnimalWord } from './models/animalWord.entity';
import { FamousPeopleWord } from './models/famousPeopleWord.entity';
import { FoodWord } from './models/foodWord.entity';
import { MovieWord } from './models/movieWord.entity';
import { ThingWord } from './models/thingWord.entity';
import { Word } from './models/word.entity';

@Injectable()
export class WordsService {
  private MAX_WORD_AMOUNT = 25;

  private categoryRepositories = new Map<string, Repository<any>>();
  private categoryEntities = new Map<string, typeof Word>();

  constructor(
    @InjectRepository(ActivityWord)
    activityWordRepository: Repository<ActivityWord>,
    @InjectRepository(AnimalWord)
    animalWordRepository: Repository<AnimalWord>,
    @InjectRepository(FamousPeopleWord)
    famousPeopleWordRepository: Repository<FamousPeopleWord>,
    @InjectRepository(FoodWord)
    foodWordRepository: Repository<FoodWord>,
    @InjectRepository(MovieWord)
    movieWordRepository: Repository<MovieWord>,
    @InjectRepository(ThingWord)
    thingWordRepository: Repository<ThingWord>
  ) {
    this.categoryRepositories.set('activity', activityWordRepository);
    this.categoryRepositories.set('animal', animalWordRepository);
    this.categoryRepositories.set('person', famousPeopleWordRepository);
    this.categoryRepositories.set('food', foodWordRepository);
    this.categoryRepositories.set('movie', movieWordRepository);
    this.categoryRepositories.set('thing', thingWordRepository);

    this.categoryEntities.set('activity', ActivityWord);
    this.categoryEntities.set('animal', AnimalWord);
    this.categoryEntities.set('person', FamousPeopleWord);
    this.categoryEntities.set('food', FoodWord);
    this.categoryEntities.set('movie', MovieWord);
    this.categoryEntities.set('thing', ThingWord);
  }

  addWord(word: string, category: string) {
    if (!this.categoryRepositories.has(category))
      throw new HttpException(`Specified category ${category} does not exist`, HttpStatus.BAD_REQUEST);

    return this.categoryRepositories.get(category).save({word: word});
  }

  async getWordsFromAll(amount: number, categories: string[]): Promise<Word[]> {
    amount = Math.min(amount, this.MAX_WORD_AMOUNT);

    let words = await Promise.all(categories.map(category => this.getWords(category, Math.ceil(amount/categories.length))));
    let flattenedWords = [].concat.apply([], words);

    flattenedWords = flattenedWords.sort((a, b) => 0.5 - Math.random());

    return flattenedWords.slice(0, amount);
  }

  getWords(category: string, amount: number) {
    if (!this.categoryEntities.has(category))
      throw new HttpException(`Specified category ${category} does not exist`, HttpStatus.BAD_REQUEST);

    amount = Math.min(amount, this.MAX_WORD_AMOUNT);

    return this.categoryRepositories.get(category).createQueryBuilder()
      .select(category+".word")
      .from(this.categoryEntities.get(category), category)
      .orderBy("RANDOM()")
      .limit(amount)
      .getMany();
  }
}

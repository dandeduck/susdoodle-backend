import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityWord } from './models/activityWord.entity';
import { AnimalWord } from './models/animalWord.entity';
import { FamousPeopleWord } from './models/famousPeopleWord.entity';
import { FoodWord } from './models/foodWord.entity';
import { MovieWord } from './models/movieWord.entity';

@Injectable()
export class WordsService {
  private categoryRepositories = new Map<string, Repository<any>>();

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
    movieWordRepository: Repository<MovieWord>
  ) {
    this.categoryRepositories.set('activity', activityWordRepository);
    this.categoryRepositories.set('animal', animalWordRepository);
    this.categoryRepositories.set('person', famousPeopleWordRepository);
    this.categoryRepositories.set('food', foodWordRepository);
    this.categoryRepositories.set('movie', movieWordRepository);
  }

  addWord(word: string, category: string) {
    return this.categoryRepositories.get(category).save({word: word});
  }
}

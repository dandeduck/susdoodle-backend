import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityWord } from './models/activityWord.entity';
import { AnimalWord } from './models/animalWord.entity';
import { FamousPeopleWord } from './models/famousPeopleWord.entity';
import { FoodWord } from './models/foodWord.entity';
import { MovieWord } from './models/movieWord.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityWord, AnimalWord, FamousPeopleWord, FoodWord, MovieWord])
  ],
  providers: [WordsService],
  controllers: [WordsController]
})
export class WordsModule {}

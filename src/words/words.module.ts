import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityWord } from './models/activityWord.entity';
import { AnimalWord } from './models/animalWord.entity';
import { FamousPeopleWord } from './models/famousPeopleWord.entity';
import { FoodWord } from './models/foodWord.entity';
import { MovieWord } from './models/movieWord.entity';
import { ThingWord } from './models/thingWord.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityWord, AnimalWord, FamousPeopleWord, FoodWord, MovieWord, ThingWord])
  ],
  providers: [WordsService],
  controllers: [WordsController],
  exports: [WordsService]
})
export class WordsModule {}

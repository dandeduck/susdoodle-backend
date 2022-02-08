import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from './word.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WordEntity])
  ],
  providers: [WordsService],
  controllers: [WordsController]
})
export class WordsModule {}

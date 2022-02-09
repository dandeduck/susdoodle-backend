import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { WordsModule } from 'src/words/words.module';
import { WordsService } from 'src/words/words.service';

@Module({
  imports: [WordsModule],
  providers: [RoomsService],
  controllers: [RoomsController]
})
export class RoomsModule {}

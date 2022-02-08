import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { RoomsModule } from './rooms/rooms.module';
import { WordsModule } from './words/words.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    RoomsModule,
    WordsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { RoomsModule } from './rooms/rooms.module';
import { WordsModule } from './words/words.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    RoomsModule,
    WordsModule,
    AuthModule,
    GameModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
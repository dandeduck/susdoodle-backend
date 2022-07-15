import { Module } from '@nestjs/common';
import { RoomsModule } from 'src/rooms/rooms.module';
import { GameGateway } from './game.gateway';

@Module({
  imports: [RoomsModule],
  controllers: [],
  providers: [GameGateway]
})
export class GameModule {}

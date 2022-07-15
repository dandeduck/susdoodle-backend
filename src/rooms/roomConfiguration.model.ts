import { Word } from "src/words/models/word.entity";

export interface RoomConfiguration {
  words: Word[],
  size: number,
  isOpen: boolean,
  doodleTime: number
}
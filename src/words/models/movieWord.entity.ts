import { Entity } from "typeorm";
import { Word } from "./word.entity";

@Entity('movieWord')
export class MovieWord extends Word {}
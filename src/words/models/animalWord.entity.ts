import { Entity } from "typeorm";
import { Word } from "./word.entity";

@Entity('animalWord')
export class AnimalWord extends Word {}
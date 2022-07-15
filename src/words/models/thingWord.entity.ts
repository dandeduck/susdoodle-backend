import { Entity } from "typeorm";
import { Word } from "./word.entity";

@Entity('ThingWord')
export class ThingWord extends Word {}
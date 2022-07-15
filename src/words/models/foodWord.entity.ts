import { Entity } from "typeorm";
import { Word } from "./word.entity";

@Entity('foodWord')
export class FoodWord extends Word {}
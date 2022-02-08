import { Entity } from "typeorm";
import { Word } from "./word.entity";

@Entity('activityWord')
export class ActivityWord extends Word {}
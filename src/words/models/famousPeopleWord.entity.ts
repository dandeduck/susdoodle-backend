import { Entity } from "typeorm";
import { Word } from "./word.entity";

@Entity('famousPeopleWord')
export class FamousPeopleWord extends Word {}
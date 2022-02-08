import { PrimaryGeneratedColumn, Column, Entity} from 'typeorm';

export abstract class Word {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 32 })
    word: string;
}
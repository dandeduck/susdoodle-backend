import { PrimaryGeneratedColumn, Column, Entity} from 'typeorm';

@Entity({ name: 'word' })
export class WordEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 32 })
    word: string;
}
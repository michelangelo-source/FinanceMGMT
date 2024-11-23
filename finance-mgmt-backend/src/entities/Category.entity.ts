import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HistoryEntity } from './History.entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;
  @Column({ name: 'Category' })
  Category: string;
  @Column({ name: 'is_expanse' })
  is_expanse: boolean;
  @OneToMany(() => HistoryEntity, (history) => history.category)
  history: HistoryEntity[];
}

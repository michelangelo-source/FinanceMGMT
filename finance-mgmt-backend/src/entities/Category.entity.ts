import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id?: number;
  @Column({ name: 'Category' })
  Category: string;
  @Column({ name: 'is_expanse' })
  is_expanse: boolean;
}

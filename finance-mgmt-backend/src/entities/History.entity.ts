import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BankAccountEntity } from './BankAccount.entity';
import { CategoryEntity } from './Category.entity';

@Entity('History')
export class HistoryEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id?: number;
  @Column({ name: 'AccountId' })
  @ManyToOne(() => BankAccountEntity, (bankAccount) => bankAccount.id)
  @JoinColumn({ name: 'Id' })
  accountId: number;
  @Column({ name: 'CategoryId' })
  @ManyToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.id)
  @JoinColumn({ name: 'Id' })
  categoryId: number;
  @Column('decimal', { name: 'AmountBefore', precision: 10, scale: 2 })
  amountBefore: number;
  @Column('decimal', { name: 'Amount', precision: 10, scale: 2 })
  amount: number;
  @Column({ name: 'Date' })
  createdAt: Date;
  @Column({ name: 'Description' })
  description: string;
}

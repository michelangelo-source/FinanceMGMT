import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BankAccountEntity } from './BankAccount.entity';
import { CategoryEntity } from './Category.entity';
import { Exclude } from 'class-transformer';

@Entity('History')
export class HistoryEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;
  @Exclude()
  @ManyToOne(() => BankAccountEntity, (bankAccount) => bankAccount.history)
  @JoinColumn({ name: 'AccountId' })
  account: BankAccountEntity;

  @ManyToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.history)
  @JoinColumn({ name: 'CategoryId' })
  category: CategoryEntity;

  @Column('decimal', { name: 'AmountBefore', precision: 10, scale: 2 })
  amountBefore: number;

  @Column('decimal', { name: 'Amount', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', name: 'Date' })
  createdAt: Date;

  @Column({ name: 'Description' })
  description: string;
}

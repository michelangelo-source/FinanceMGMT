import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './Category.entity';
import { Exclude } from 'class-transformer';
import { SavingGoalAccountEntity } from './SavingGoalAccount.entity';

@Entity('saving_goal_history')
export class SavingGoalHistoryEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;
  @Exclude()
  @ManyToOne(
    () => SavingGoalAccountEntity,
    (savingAccount) => savingAccount.history,
  )
  @JoinColumn({ name: 'SavingAccountId' })
  savingAccount: SavingGoalAccountEntity;

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
  @Column({ name: 'Title', nullable: true })
  title: string;
}

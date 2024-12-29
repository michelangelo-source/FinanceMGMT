import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';
import { SavingGoalHistoryEntity } from './SavingGoalHistory.entity';
import { Exclude } from 'class-transformer';

@Entity('saving_goal_sub_accounts')
export class SavingGoalAccountEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;
  @ManyToOne(() => User, (user) => user.savingAccount)
  @JoinColumn({ name: 'UserId' })
  @Exclude()
  user: User;
  @Column('decimal', { name: 'Goal', precision: 10, scale: 2 })
  goal: number;
  @Column('decimal', { name: 'Balance', precision: 10, scale: 2 })
  balance: number;
  @Column({ name: 'Description', nullable: false })
  description: string;

  @OneToMany(
    () => SavingGoalHistoryEntity,
    (savingGoalHistory) => savingGoalHistory.savingAccount,
  )
  history: SavingGoalHistoryEntity[];
}

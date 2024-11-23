import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User.entity';
import { HistoryEntity } from './History.entity';

@Entity('bank_accounts')
export class BankAccountEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @OneToOne(() => User, (user) => user.bankAccount)
  @JoinColumn({ name: 'UserId' })
  user: User;

  @Column('decimal', { name: 'Balance', precision: 10, scale: 2 })
  balance: number;

  @OneToMany(() => HistoryEntity, (history) => history.account)
  history: HistoryEntity[];
}

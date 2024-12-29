import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BankAccountEntity } from './BankAccount.entity';
import { SavingGoalAccountEntity } from './SavingGoalAccount.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Login', nullable: false })
  login: string;

  @Column({ name: 'Password' })
  password: string;

  @Column({ name: 'Name' })
  name: string;

  @Column({ default: 'USER', name: 'Role' })
  role: string;

  @OneToOne(() => BankAccountEntity, (bankAccount) => bankAccount.user)
  bankAccount: BankAccountEntity;
  @OneToMany(
    () => SavingGoalAccountEntity,
    (savingAccount) => savingAccount.user,
  )
  savingAccount: SavingGoalAccountEntity;
}

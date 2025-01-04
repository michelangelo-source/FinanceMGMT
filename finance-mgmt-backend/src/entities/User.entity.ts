import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BankAccountEntity } from './BankAccount.entity';
import { SavingGoalAccountEntity } from './SavingGoalAccount.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'Id' })
  @Exclude()
  id: number;

  @Column({ name: 'Login', nullable: false })
  login: string;

  @Column({ name: 'Password' })
  @Exclude()
  password: string;

  @Column({ name: 'Name' })
  name: string;

  @Column({ default: 'USER', name: 'Role' })
  @Exclude()
  role: string;

  @OneToOne(() => BankAccountEntity, (bankAccount) => bankAccount.user)
  bankAccount: BankAccountEntity;
  @OneToMany(
    () => SavingGoalAccountEntity,
    (savingAccount) => savingAccount.user,
  )
  savingAccount: SavingGoalAccountEntity;
}

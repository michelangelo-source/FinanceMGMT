import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { BankAccountEntity } from './BankAccount.entity';

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
}

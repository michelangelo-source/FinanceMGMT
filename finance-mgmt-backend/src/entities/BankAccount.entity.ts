import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './User.entity';

@Entity('bank_accounts')
export class BankAccountEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id?: number;
  @Column({ name: 'userId' })
  @OneToOne(() => User, (user) => user.id)
  userId: number;
  @Column({ name: 'Balance' })
  balance: number;
}

import { Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { UserService } from './User.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { BankAccountService } from '../bank-account/bank-account.service';
import { BankAccountEntity } from '../entities/BankAccount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BankAccountEntity])],
  controllers: [UserController],
  providers: [UserService, BankAccountService],
})
export class UserModule {}

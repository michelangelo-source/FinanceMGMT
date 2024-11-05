import { Module } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { BankAccountController } from './bank-account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountEntity } from '../entities/BankAccount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccountEntity])],
  providers: [BankAccountService],
  controllers: [BankAccountController],
})
export class BankAccountModule {}

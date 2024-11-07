import { forwardRef, Module } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { BankAccountController } from './bank-account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountEntity } from '../entities/BankAccount.entity';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BankAccountEntity]),
    forwardRef(() => HistoryModule),
  ],
  providers: [BankAccountService],
  controllers: [BankAccountController],
  exports: [BankAccountService],
})
export class BankAccountModule {}

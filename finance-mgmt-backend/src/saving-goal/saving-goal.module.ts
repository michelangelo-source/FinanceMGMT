import { Module } from '@nestjs/common';
import { SavingGoalService } from './saving-goal.service';
import { SavingGoalController } from './saving-goal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingGoalAccountEntity } from '../entities/SavingGoalAccount.entity';
import { UserModule } from '../user/User.module';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { SavingGoalHistoryModule } from '../saving-goal-history/saving-goal-history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SavingGoalAccountEntity]),
    UserModule,
    BankAccountModule,
    SavingGoalHistoryModule,
  ],
  providers: [SavingGoalService],
  controllers: [SavingGoalController],
  exports: [SavingGoalService],
})
export class SavingGoalModule {}

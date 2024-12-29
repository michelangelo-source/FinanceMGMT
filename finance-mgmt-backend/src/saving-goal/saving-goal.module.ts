import { Module } from '@nestjs/common';
import { SavingGoalService } from './saving-goal.service';
import { SavingGoalController } from './saving-goal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingGoalAccountEntity } from '../entities/SavingGoalAccount.entity';
import { UserModule } from '../user/User.module';

@Module({
  imports: [TypeOrmModule.forFeature([SavingGoalAccountEntity]), UserModule],
  providers: [SavingGoalService],
  controllers: [SavingGoalController],
})
export class SavingGoalModule {}

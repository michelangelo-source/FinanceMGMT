import { Module } from '@nestjs/common';
import { SavingGoalHistoryService } from './saving-goal-history.service';
import { SavingGoalHistoryController } from './saving-goal-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingGoalHistoryEntity } from '../entities/SavingGoalHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavingGoalHistoryEntity])],
  providers: [SavingGoalHistoryService],
  controllers: [SavingGoalHistoryController],
  exports: [SavingGoalHistoryService],
})
export class SavingGoalHistoryModule {}

import { forwardRef, Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryEntity } from '../entities/History.entity';
import { BankAccountModule } from '../bank-account/bank-account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoryEntity]),
    forwardRef(() => BankAccountModule),
  ],
  providers: [HistoryService],
  controllers: [HistoryController],
  exports: [HistoryService],
})
export class HistoryModule {}

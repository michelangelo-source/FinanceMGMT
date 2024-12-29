import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { SavingGoalHistoryEntity } from '../entities/SavingGoalHistory.entity';
import { SavingGoalAccountEntity } from '../entities/SavingGoalAccount.entity';
import { SavingGoalHistoryDTO } from './saving-goal-historyDTO';

@Injectable()
export class SavingGoalHistoryService {
  constructor(
    @InjectRepository(SavingGoalHistoryEntity)
    private readonly savingGoalHistoryEntityRepository: Repository<SavingGoalHistoryEntity>,
  ) {}

  async save(history: SavingGoalHistoryEntity) {
    await this.savingGoalHistoryEntityRepository.save(history);
  }

  async getOwnHistory(userId: number) {
    return await this.savingGoalHistoryEntityRepository.find({
      where: {
        savingAccount: {
          user: { id: userId },
        },
      },
      relations: ['account', 'account.user'],
      order: { createdAt: 'DESC' },
    });
  }

  async getOwnHistoryByDates(userId: number, dateFrom: Date, dateTo: Date) {
    const dateFromStart = new Date(dateFrom);
    dateFromStart.setHours(0, 0, 0, 0);

    const dateToEnd = new Date(dateTo);
    dateToEnd.setHours(23, 59, 59, 999);
    return await this.savingGoalHistoryEntityRepository.find({
      where: {
        savingAccount: {
          user: { id: userId },
        },
        createdAt: Between(dateFromStart, dateToEnd),
      },
      relations: ['account', 'account.user'],
      order: { createdAt: 'DESC' },
    });
  }

  createHistory(
    savingAccount: SavingGoalAccountEntity,
    savingHistoryDTO: SavingGoalHistoryDTO,
    isExpenditure: boolean,
  ) {
    return this.savingGoalHistoryEntityRepository.create({
      savingAccount: savingAccount,
      category: { id: savingHistoryDTO.categoryId },
      amountBefore: savingAccount.balance,
      amount: isExpenditure
        ? -savingHistoryDTO.amount
        : savingHistoryDTO.amount,
      createdAt: new Date(),
      description: savingHistoryDTO.description,
      title: savingHistoryDTO.title,
    });
  }
}

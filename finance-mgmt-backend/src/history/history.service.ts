import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { HistoryEntity } from '../entities/History.entity';
import { BankAccountService } from '../bank-account/bank-account.service';
import { BankAccountEntity } from '../entities/BankAccount.entity';
import { HistoryDTO } from './historyDTO';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private readonly historyRepository: Repository<HistoryEntity>,
    @Inject(forwardRef(() => BankAccountService))
    private bankAccountService: BankAccountService,
  ) {}

  async save(history: HistoryEntity) {
    await this.historyRepository.save(history);
  }

  async getOwnHistory(userId: number) {
    return await this.historyRepository.find({
      where: {
        account: {
          user: { id: userId },
        },
      },
      relations: ['account', 'account.user', 'category'],
      order: { createdAt: 'DESC' },
    });
  }

  async getOwnHistoryByDates(userId: number, dateFrom: Date, dateTo: Date) {
    const dateFromStart = new Date(dateFrom);
    dateFromStart.setHours(0, 0, 0, 0);

    const dateToEnd = new Date(dateTo);
    dateToEnd.setHours(23, 59, 59, 999);
    return await this.historyRepository.find({
      where: {
        account: {
          user: { id: userId },
        },
        createdAt: Between(dateFromStart, dateToEnd),
      },
      relations: ['account', 'account.user', 'category'],
      order: { createdAt: 'DESC' },
    });
  }

  createHistory(
    account: BankAccountEntity,
    historyDTO: HistoryDTO,
    isExpenditure: boolean,
  ) {
    return this.historyRepository.create({
      account: account,
      category: { id: historyDTO.categoryId },
      amountBefore: account.balance,
      amount: isExpenditure ? -historyDTO.amount : historyDTO.amount,
      createdAt: new Date(),
      description: historyDTO.description,
      title: historyDTO.title,
    });
  }
}

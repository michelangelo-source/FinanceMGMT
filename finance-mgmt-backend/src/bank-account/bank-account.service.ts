import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccountEntity } from '../entities/BankAccount.entity';
import { Repository } from 'typeorm';
import { HistoryEntity } from '../entities/History.entity';
import { HistoryDTO } from '../history/historyDTO';
import { HistoryService } from '../history/history.service';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccountEntity)
    private bankAccountRepository: Repository<BankAccountEntity>,
    @Inject(forwardRef(() => HistoryService))
    private historyService: HistoryService,
  ) {}

  async createAccount(userId: number) {
    const account: BankAccountEntity = {
      userId: userId,
      balance: 0,
    };
    await this.bankAccountRepository.save(account);
  }

  async getAccount(userId: number) {
    return await this.bankAccountRepository.findOneBy({
      userId: userId,
    });
  }

  async deposit(userId: number, deposit: HistoryDTO) {
    const account = await this.getAccount(userId);
    const history: HistoryEntity = {
      accountId: account.id,
      categoryId: deposit.categoryId,
      amountBefore: account.balance,
      amount: deposit.amount,
      createdAt: new Date(),
      description: deposit.description,
    };
    account.balance += deposit.amount;
    await this.bankAccountRepository.update(account.id, account);
    await this.historyService.save(history);
  }

  async expenditure(userId: number, expenditure: HistoryDTO) {
    const account = await this.getAccount(userId);
    const history: HistoryEntity = {
      accountId: account.id,
      categoryId: expenditure.categoryId,
      amountBefore: account.balance,
      amount: expenditure.amount,
      createdAt: new Date(),
      description: expenditure.description,
    };
    account.balance -= expenditure.amount;

    await this.bankAccountRepository.update(account.id, account);
    await this.historyService.save(history);
  }
}

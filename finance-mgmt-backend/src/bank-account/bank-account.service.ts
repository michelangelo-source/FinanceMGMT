import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccountEntity } from '../entities/BankAccount.entity';
import { Repository } from 'typeorm';
import { HistoryDTO } from '../history/historyDTO';
import { HistoryService } from '../history/history.service';
import { User } from '../entities/User.entity';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccountEntity)
    private bankAccountRepository: Repository<BankAccountEntity>,
    @Inject(forwardRef(() => HistoryService))
    private historyService: HistoryService,
  ) {}

  async createAccount(user: User) {
    const account: BankAccountEntity = this.bankAccountRepository.create({
      balance: 0,
      user: user,
    });
    return this.bankAccountRepository.save(account);
  }

  async getAccount(userId: number) {
    return this.bankAccountRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async deposit(userId: number, deposit: HistoryDTO) {
    const account = await this.getAccount(userId);
    if (!account) {
      throw new Error('Account not found');
    }

    const history = this.historyService.createHistory(account, deposit, false);
    account.balance = parseFloat(account.balance as any);
    account.balance += deposit.amount;
    await this.bankAccountRepository.save(account);
    await this.historyService.save(history);
  }

  async expenditure(userId: number, expenditure: HistoryDTO): Promise<void> {
    const account = await this.getAccount(userId);
    if (!account) {
      throw new Error('Account not found');
    }
    if (account.balance < expenditure.amount) {
      throw new Error('Insufficient balance');
    }
    const history = this.historyService.createHistory(
      account,
      expenditure,
      true,
    );
    account.balance -= expenditure.amount;
    await this.bankAccountRepository.save(account);
    await this.historyService.save(history);
  }
}

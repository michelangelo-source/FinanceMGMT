import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccountEntity } from '../entities/BankAccount.entity';
import { Repository } from 'typeorm';
import { AccountDTO } from './accountDTO';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccountEntity)
    private bankAccountRepository: Repository<BankAccountEntity>,
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

  async deposit(userId: number, deposit: AccountDTO) {
    const account = await this.getAccount(userId);
    account.balance += deposit.balance;
    await this.bankAccountRepository.update(account.id, account);
  }

  async expenditure(userId: number, deposit: AccountDTO) {
    const account = await this.getAccount(userId);
    account.balance -= deposit.balance;
    await this.bankAccountRepository.update(account.id, account);
  }
}

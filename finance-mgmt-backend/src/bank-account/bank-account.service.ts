import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccountEntity } from '../entities/BankAccount.entity';
import { Repository } from 'typeorm';

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
    const account = await this.bankAccountRepository.findOneBy({
      userId: userId,
    });
    account.id = null;
    return account;
  }
}

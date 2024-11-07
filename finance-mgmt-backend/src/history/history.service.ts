import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryEntity } from '../entities/History.entity';
import { BankAccountService } from '../bank-account/bank-account.service';

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
    const account = await this.bankAccountService.getAccount(userId);
    return await this.historyRepository.findBy({ accountId: account.id });
  }
}

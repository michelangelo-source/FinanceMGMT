import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SavingGoalAccountEntity } from '../entities/SavingGoalAccount.entity';
import { Repository } from 'typeorm';
import { SavingGoalDTO } from './saving-goalDTO';
import { UserService } from '../user/User.service';
import { BankAccountService } from '../bank-account/bank-account.service';
import { HistoryDTO } from '../history/historyDTO';
import { SavingGoalHistoryService } from '../saving-goal-history/saving-goal-history.service';
import { SavingGoalHistoryDTO } from '../saving-goal-history/saving-goal-historyDTO';

@Injectable()
export class SavingGoalService {
  constructor(
    @InjectRepository(SavingGoalAccountEntity)
    private savingGoalAccountRepository: Repository<SavingGoalAccountEntity>,
    private readonly userService: UserService,
    private readonly bankAccountService: BankAccountService,
    private readonly savingGoalHistoryService: SavingGoalHistoryService,
  ) {}

  async save(userId: number, saving_goalDto: SavingGoalDTO) {
    const savingGoal = new SavingGoalAccountEntity();
    savingGoal.goal = saving_goalDto.goal;
    savingGoal.balance = 0;
    const user = this.userService.findById(userId);
    savingGoal.user = await user;
    savingGoal.description = saving_goalDto.description;
    return this.savingGoalAccountRepository.save(savingGoal);
  }

  async getAllForUser(userId: number) {
    return this.savingGoalAccountRepository.findBy({ user: { id: userId } });
  }

  async deposit(userId: number, deposit: SavingGoalHistoryDTO) {
    const savingGoalHistoryDTO = new HistoryDTO(
      deposit.amount,
      11,
      deposit.description,
      deposit.title,
    );
    await this.bankAccountService.expenditure(userId, savingGoalHistoryDTO);

    const savingAccount = await this.gatSavingAccount(
      userId,
      deposit.AccountId,
    );
    if (!savingAccount) {
      throw new Error('Account not found');
    }
    const history = this.savingGoalHistoryService.createHistory(
      savingAccount,
      deposit,
      false,
    );
    savingAccount.balance = parseFloat(savingAccount.balance as any);
    savingAccount.balance += deposit.amount;
    await this.savingGoalAccountRepository.save(savingAccount);
    await this.savingGoalHistoryService.save(history);
  }

  async expenditure(userId: number, expenditure: SavingGoalHistoryDTO) {
    const savingGoalHistoryDTO = new HistoryDTO(
      expenditure.amount,
      12,
      expenditure.description,
      expenditure.title,
    );
    await this.bankAccountService.deposit(userId, savingGoalHistoryDTO);

    const savingAccount = await this.gatSavingAccount(
      userId,
      expenditure.AccountId,
    );
    if (!savingAccount) {
      throw new Error('Account not found');
    }
    if (savingAccount.balance < expenditure.amount) {
      throw new Error('Insufficient balance');
    }
    const history = this.savingGoalHistoryService.createHistory(
      savingAccount,
      expenditure,
      true,
    );
    savingAccount.balance = parseFloat(savingAccount.balance as any);
    savingAccount.balance -= expenditure.amount;
    await this.savingGoalAccountRepository.save(savingAccount);
    await this.savingGoalHistoryService.save(history);
  }

  private gatSavingAccount(userId: number, AccountId: number) {
    return this.savingGoalAccountRepository.findOneBy({
      id: AccountId,
      user: { id: userId },
    });
  }
}

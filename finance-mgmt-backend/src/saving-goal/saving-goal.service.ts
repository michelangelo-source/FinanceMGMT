import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SavingGoalAccountEntity } from '../entities/SavingGoalAccount.entity';
import { Repository } from 'typeorm';
import { SavingGoalDTO } from './saving-goalDTO';
import { UserService } from '../user/User.service';

@Injectable()
export class SavingGoalService {
  constructor(
    @InjectRepository(SavingGoalAccountEntity)
    private savingGoalAccountRepository: Repository<SavingGoalAccountEntity>,
    private readonly userService: UserService,
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
}

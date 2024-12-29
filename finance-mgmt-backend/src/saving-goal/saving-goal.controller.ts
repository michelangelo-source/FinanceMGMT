import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SavingGoalService } from './saving-goal.service';
import { SavingGoalDTO } from './saving-goalDTO';
import { UserID } from '../user/user.decorator';
import { TokenGuard } from '../token/token.guard';
import { plainToInstance } from 'class-transformer';
import { SavingGoalAccountEntity } from '../entities/SavingGoalAccount.entity';

@Controller('saving-goal')
export class SavingGoalController {
  constructor(private readonly service: SavingGoalService) {}

  @Post()
  @UseGuards(TokenGuard)
  addSavinGoal(
    @UserID() userId: number,
    @Body() saving_goalDto: SavingGoalDTO,
  ) {
    return plainToInstance(
      SavingGoalAccountEntity,
      this.service.save(userId, saving_goalDto),
    );
  }

  @Get('/own')
  @UseGuards(TokenGuard)
  async getOwn(@UserID() userId: number) {
    return plainToInstance(
      SavingGoalAccountEntity,
      this.service.getAllForUser(userId),
    );
  }
}

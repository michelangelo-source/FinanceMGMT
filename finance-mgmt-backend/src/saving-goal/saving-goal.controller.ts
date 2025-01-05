import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SavingGoalService } from './saving-goal.service';
import { SavingGoalDTO } from './saving-goalDTO';
import { UserID } from '../user/user.decorator';
import { TokenGuard } from '../token/token.guard';
import { plainToInstance } from 'class-transformer';
import { SavingGoalAccountEntity } from '../entities/SavingGoalAccount.entity';
import { SavingGoalHistoryDTO } from '../saving-goal-history/saving-goal-historyDTO';

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

  @Put('deposit')
  @UseGuards(TokenGuard)
  async deposit(
    @UserID() userId: number,
    @Body() deposit: SavingGoalHistoryDTO,
  ) {
    await this.service.deposit(userId, deposit);
  }

  @Put('expenditure')
  @UseGuards(TokenGuard)
  async expenditure(
    @UserID() userId: number,
    @Body() deposit: SavingGoalHistoryDTO,
  ) {
    await this.service.expenditure(userId, deposit);
  }

  @Delete('/:id')
  @UseGuards(TokenGuard)
  async delete(@UserID() userId: number, @Param('id') id: number) {
    await this.service.deleteSavingGoal(userId, id);
  }
}

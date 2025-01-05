import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TokenGuard } from '../token/token.guard';
import { UserID } from '../user/user.decorator';
import { plainToInstance } from 'class-transformer';
import { HistoryEntity } from '../entities/History.entity';
import { SavingGoalHistoryService } from './saving-goal-history.service';
import { SavingGoalHistoryEntity } from '../entities/SavingGoalHistory.entity';

@Controller('saving-goal-history')
export class SavingGoalHistoryController {
  constructor(
    private readonly savingGoalHistoryService: SavingGoalHistoryService,
  ) {}

  @Get('own')
  @UseGuards(TokenGuard)
  async getOwnHistory(@UserID() userId: number) {
    return plainToInstance(
      SavingGoalHistoryEntity,
      this.savingGoalHistoryService.getOwnHistory(userId),
    );
  }

  @Get('own/:id')
  @UseGuards(TokenGuard)
  async getHistoryForOne(
    @UserID() userId: number,
    @Param('id') savingId: number,
  ) {
    return plainToInstance(
      SavingGoalHistoryEntity,
      this.savingGoalHistoryService.getHistoryForOne(userId, savingId),
    );
  }

  @Get('own/:dateFrom/:dateTo')
  @UseGuards(TokenGuard)
  async getOwnHistoryByDates(
    @UserID() userId: number,
    @Param('dateFrom') dateFrom: Date,
    @Param('dateTo') dateTo: Date,
  ) {
    return plainToInstance(
      HistoryEntity,
      this.savingGoalHistoryService.getOwnHistoryByDates(
        userId,
        dateFrom,
        dateTo,
      ),
    );
  }

  @Get('own/:id/:dateFrom/:dateTo')
  @UseGuards(TokenGuard)
  async getHistoryForOneByDates(
    @UserID() userId: number,
    @Param('id') savingId: number,
    @Param('dateFrom') dateFrom: Date,
    @Param('dateTo') dateTo: Date,
  ) {
    return plainToInstance(
      HistoryEntity,
      this.savingGoalHistoryService.getHistoryForOnByDates(
        userId,
        savingId,
        dateFrom,
        dateTo,
      ),
    );
  }
}

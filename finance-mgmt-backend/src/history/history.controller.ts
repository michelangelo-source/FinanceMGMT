import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TokenGuard } from '../token/token.guard';
import { UserID } from '../user/user.decorator';
import { HistoryService } from './history.service';
import { plainToInstance } from 'class-transformer';
import { HistoryEntity } from '../entities/History.entity';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('own')
  @UseGuards(TokenGuard)
  async getOwnHistory(@UserID() userId: number) {
    return plainToInstance(
      HistoryEntity,
      this.historyService.getOwnHistory(userId),
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
      this.historyService.getOwnHistoryByDates(userId, dateFrom, dateTo),
    );
  }
}

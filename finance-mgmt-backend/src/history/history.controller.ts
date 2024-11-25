import { Controller, Get, UseGuards } from '@nestjs/common';
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
}

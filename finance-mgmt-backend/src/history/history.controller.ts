import { Controller, Get, UseGuards } from '@nestjs/common';
import { TokenGuard } from '../token/token.guard';
import { UserID } from '../user/user.decorator';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  @Get('own')
  @UseGuards(TokenGuard)
  async getOwnHistory(@UserID() userId: number) {
    return await this.historyService.getOwnHistory(userId);
  }
}

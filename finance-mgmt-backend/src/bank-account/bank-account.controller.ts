import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserID } from '../user/user.decorator';
import { TokenGuard } from '../token/token.guard';
import { BankAccountService } from './bank-account.service';

export interface Amount {
  amount: number;
}

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly banAaccountService: BankAccountService) {}

  @Get()
  @UseGuards(TokenGuard)
  async getOwnBalance(@UserID() userId: number) {
    return this.banAaccountService.getAccount(userId);
  }

  @Put('deposit')
  @UseGuards(TokenGuard)
  async deposit(@UserID() userId: number, @Body() deposit: Amount) {
    await this.banAaccountService.deposit(userId, deposit);
  }
}

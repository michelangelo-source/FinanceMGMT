import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserID } from '../user/user.decorator';
import { TokenGuard } from '../token/token.guard';
import { BankAccountService } from './bank-account.service';
import { AccountDTO } from './accountDTO';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Get('own')
  @UseGuards(TokenGuard)
  async getOwnBalance(@UserID() userId: number) {
    const account = await this.bankAccountService.getAccount(userId);
    const account2: AccountDTO = { balance: account.balance };
    return account2;
  }

  @Put('deposit')
  @UseGuards(TokenGuard)
  async deposit(@UserID() userId: number, @Body() deposit: AccountDTO) {
    await this.bankAccountService.deposit(userId, deposit);
  }

  @Put('expenditure')
  @UseGuards(TokenGuard)
  async expenditure(@UserID() userId: number, @Body() deposit: AccountDTO) {
    await this.bankAccountService.expenditure(userId, deposit);
  }
}

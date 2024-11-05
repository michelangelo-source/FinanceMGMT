import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserID } from '../user/user.decorator';
import { TokenGuard } from '../token/token.guard';
import { BankAccountService } from './bank-account.service';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly banAaccountService: BankAccountService) {}

  @Get()
  @UseGuards(TokenGuard)
  async getOwnBalance(@UserID() userId: number) {
    return this.banAaccountService.getAccount(userId);
  }
}

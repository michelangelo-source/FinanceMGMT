import { BadRequestException } from '@nestjs/common';

export class InsufficientBalanceExceptions extends BadRequestException {
  constructor() {
    super('Insufficient balance');
  }
}

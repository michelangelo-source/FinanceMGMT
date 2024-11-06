import { IsNotEmpty, IsNumber } from 'class-validator';

export class AccountDTO {
  @IsNotEmpty()
  @IsNumber()
  balance: number;
}

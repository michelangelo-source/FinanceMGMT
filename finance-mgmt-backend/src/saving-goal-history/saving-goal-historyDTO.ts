import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SavingGoalHistoryDTO {
  constructor(
    amount: number,
    categoryId: number,
    description: string,
    title: string,
    SavingAccountId: number,
  ) {
    this.amount = amount;
    this.categoryId = categoryId;
    this.description = description;
    this.title = title;
    this.SavingAccountId = SavingAccountId;
  }

  @IsNotEmpty()
  @IsNumber()
  amount: number;
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsNumber()
  SavingAccountId: number;
}

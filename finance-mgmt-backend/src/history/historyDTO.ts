import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HistoryDTO {
  constructor(
    amount: number,
    categoryId: number,
    description: string,
    title: string,
  ) {
    this.amount = amount;
    this.categoryId = categoryId;
    this.description = description;
    this.title = title;
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
}

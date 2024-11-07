import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HistoryDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
  @IsNotEmpty()
  @IsString()
  description: string;
}

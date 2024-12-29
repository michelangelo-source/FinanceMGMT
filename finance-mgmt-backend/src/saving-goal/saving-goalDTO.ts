import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class SavingGoalDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  goal: number;
  @IsNotEmpty()
  @IsString()
  description: string;
}

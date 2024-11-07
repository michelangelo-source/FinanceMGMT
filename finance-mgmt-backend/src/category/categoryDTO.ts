import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty()
  @IsString()
  Category: string;
  @IsNotEmpty()
  @IsBoolean()
  is_expanse: boolean;
}

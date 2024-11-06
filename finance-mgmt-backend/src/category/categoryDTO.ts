import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty()
  @IsString()
  Category: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterRequestDTO {
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}

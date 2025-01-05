import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UserDataDTO {
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsBoolean()
  loginChanged: boolean;
}

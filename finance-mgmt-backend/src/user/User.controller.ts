import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './User.service';
import { RegisterRequestDTO } from './RegisterRequestDTO';
import { TokenGuard } from '../token/token.guard';
import { UserID } from './user.decorator';
import { plainToInstance } from 'class-transformer';
import { User } from '../entities/User.entity';
import { ChangePasswordDTO } from './ChangePasswordDTO';
import { UserDataDTO } from './ChangingUserDataDTO';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  registerUser(@Body() user: RegisterRequestDTO) {
    return this.userService.save(user);
  }

  @Get('/own')
  @UseGuards(TokenGuard)
  async getOwnData(@UserID() userId: number) {
    return plainToInstance(User, this.userService.findById(userId));
  }

  @Put('/own')
  @UseGuards(TokenGuard)
  async editUser(@UserID() userId: number, @Body() user: UserDataDTO) {
    return plainToInstance(User, this.userService.editUser(userId, user));
  }

  @Put('/changePassword')
  @UseGuards(TokenGuard)
  async changePassword(
    @UserID() userId: number,
    @Body() passwords: ChangePasswordDTO,
  ) {
    return plainToInstance(
      User,
      this.userService.changePassword(userId, passwords),
    );
  }
}

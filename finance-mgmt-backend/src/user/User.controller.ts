import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './User.service';
import { RegisterRequestDTO } from './RegisterRequestDTO';
import { TokenGuard } from '../token/token.guard';
import { UserID } from './user.decorator';
import { plainToInstance } from 'class-transformer';
import { User } from '../entities/User.entity';

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
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './User.service';
import { RegisterRequestDTO } from './RegisterRequestDTO';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  registerUser(@Body() user: RegisterRequestDTO) {
    this.userService.save(user);
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}

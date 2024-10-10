import {Body, Controller, Get, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from "./user.service";
import {RegisterRequestType} from "./registerRequest.type";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    @UsePipes(ValidationPipe)
    registerUser(@Body() user: RegisterRequestType) {
        return this.userService.save(user);
    }
    @Get(':id')
    getUserById(@Param('id') id: number) {
        return this.userService.findById(id);
    }



}

import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { BasicGuard } from './basic.guard';
import { UserID } from './user.decorator';
import { TokenService } from '../token/token.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('login')
  @UseGuards(BasicGuard)
  loginUser(
    @UserID() userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token: string = this.tokenService.createToken(userId);
    res.cookie('access-token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    res.cookie('is-logged', true, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access-token');
    res.clearCookie('is-logged');
  }
}

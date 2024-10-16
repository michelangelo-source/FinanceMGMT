import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  createToken(userId: number) {
    return this.jwtService.sign({ sub: userId }, { expiresIn: '1h' });
  }

  verifyToken(token: string): { sub: number } {
    return this.jwtService.verify(token);
  }
}

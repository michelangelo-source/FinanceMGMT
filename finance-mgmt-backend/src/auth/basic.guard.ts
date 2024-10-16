import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class BasicGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  private decodeAuthHeader(header: string) {
    const b64auth = header.split(' ')[1];
    const decoded = Buffer.from(b64auth, 'base64').toString().split(':');
    if (decoded.length != 2) return undefined;
    return { login: decoded[0], password: decoded[1] };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'];
    if (!auth) return false;
    const { login, password } = this.decodeAuthHeader(auth);
    if (!login || !password) return false;
    const user = await this.authService.verifyUser(login, password);
    if (!user) return false;
    request.userId = user.id;
    return true;
  }
}

import { BadRequestException } from '@nestjs/common';

export class LoginTakenException extends BadRequestException {
  constructor() {
    super('Login already taken');
  }
}

import { BadRequestException } from '@nestjs/common';

export class BadPasswordException extends BadRequestException {
  constructor() {
    super('Bad password');
  }
}

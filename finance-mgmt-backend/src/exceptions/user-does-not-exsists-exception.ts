import { BadRequestException } from '@nestjs/common';

export class UserDoesNotExsistsException extends BadRequestException {
  constructor() {
    super("User dosen't exists");
  }
}

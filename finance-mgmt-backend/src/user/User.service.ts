import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { RegisterRequestDTO } from './RegisterRequestDTO';
import * as bcrypt from 'bcrypt';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists-exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async save(userRegisterRequest: RegisterRequestDTO) {
    const userExists = await this.userRepository.findOneBy({
      login: userRegisterRequest.login,
    });
    if (userExists) {
      throw new UserAlreadyExistsException();
    }
    const HashedPassword = await bcrypt.hash(userRegisterRequest.password, 10);
    const user: User = {
      password: HashedPassword,
      login: userRegisterRequest.login,
      name: userRegisterRequest.name,
      role: 'USER',
    };
    await this.userRepository.save(user);
    return 'complete';
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }
}

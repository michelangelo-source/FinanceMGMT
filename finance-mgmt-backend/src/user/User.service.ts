import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { RegisterRequestDTO } from './RegisterRequestDTO';
import * as bcrypt from 'bcrypt';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists-exception';
import { BankAccountService } from '../bank-account/bank-account.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private bankAccountService: BankAccountService,
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
    const newUser = await this.userRepository.save(user);
    await this.bankAccountService.createAccount(newUser.id);
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { RegisterRequestDTO } from './RegisterRequestDTO';
import * as bcrypt from 'bcrypt';
import { BankAccountService } from '../bank-account/bank-account.service';
import { UserDoesNotExsistsException } from '../exceptions/user-does-not-exsists-exception';
import { BadPasswordException } from '../exceptions/bad-password-exception';
import { LoginTakenException } from '../exceptions/login-taken-exception';

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
      throw new LoginTakenException();
    }
    const hashedPassword = await bcrypt.hash(userRegisterRequest.password, 10);

    const user = this.userRepository.create({
      login: userRegisterRequest.login,
      password: hashedPassword,
      name: userRegisterRequest.name,
      role: 'USER',
    });

    const savedUser = await this.userRepository.save(user);
    await this.bankAccountService.createAccount(savedUser);
    return savedUser;
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }

  async editUser(userId: number, user: RegisterRequestDTO) {
    const userExists = await this.userRepository.findOneBy({ id: userId });
    if (!userExists) {
      throw new UserDoesNotExsistsException();
    }
    const loginTaken = await this.userRepository.findOneBy({
      login: user.login,
    });
    if (loginTaken) {
      throw new LoginTakenException();
    }
    const isValid = await bcrypt.compare(user.password, userExists.password);
    if (isValid) {
      userExists.name = user.name;
      userExists.login = user.login;
    } else {
      throw new BadPasswordException();
    }
    return this.userRepository.save(userExists);
  }
}

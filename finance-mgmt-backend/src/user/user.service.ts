import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User} from "../entities/user.entity";
import {RegisterRequestType} from "./registerRequest.type";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    async save(userRegisterRequest: RegisterRequestType): Promise<User> {
        const HashedPassword = await bcrypt.hash(userRegisterRequest.password, 10);
        const user: User = {
            password: HashedPassword,
            login: userRegisterRequest.login,
            name: userRegisterRequest.name,
            role: 'USER'
        }
        return this.userRepository.save(user);
    }
    //const isMatch = await bcrypt.compare(password, hash);
    async findById(id: number): Promise<User> {
        return this.userRepository.findOneBy({id:id})
    }
}

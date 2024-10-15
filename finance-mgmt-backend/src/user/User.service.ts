import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User} from "../entities/User.entity";
import {RegisterRequestType} from "./RegisterRequest.type";
import {LoginRequestType} from "./LoginRequest.type";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    async save(userRegisterRequest: RegisterRequestType) {

            let userExists=await this.userRepository.findOneBy({login: userRegisterRequest.login})
            if(userExists){
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            }
            const HashedPassword = await bcrypt.hash(userRegisterRequest.password, 10);
            const user: User = {
                password: HashedPassword,
                login: userRegisterRequest.login,
                name: userRegisterRequest.name,
                role: 'USER'
            }
            await this.userRepository.save(user);
            return "complete";
        }



    async findById(id: number): Promise<User> {
        return this.userRepository.findOneBy({id:id})
    }
    async loginUser(LoginRequest:LoginRequestType){
            let user=await this.userRepository.findOneBy({login: LoginRequest.login})
            if(!user){

            throw new HttpException("Wrong login",HttpStatus.BAD_REQUEST,null);
            }
            if(user.login===LoginRequest.login&&  await bcrypt.compare(LoginRequest.password,user.password)){
                return "tak"
            }
        throw new HttpException("Wrong password",HttpStatus.BAD_REQUEST,null);


    }
}

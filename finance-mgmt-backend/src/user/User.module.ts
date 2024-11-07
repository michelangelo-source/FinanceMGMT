import { Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { UserService } from './User.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { BankAccountModule } from '../bank-account/bank-account.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BankAccountModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

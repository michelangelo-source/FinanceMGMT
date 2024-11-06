import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/User.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConn } from '../DBconfig';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TypeOrmModule.forRoot(dbConn),
    TokenModule,
    AuthModule,
    BankAccountModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

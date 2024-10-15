import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/User.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConn} from "../DBconfig";

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(dbConn),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

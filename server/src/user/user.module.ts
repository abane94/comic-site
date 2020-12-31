import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { AuthService } from './auth.service';
import { UserService } from './user.service'
import configProvider from '../config-provider';
import { DataModule } from '../data/data.module';

@Module({
  imports: [DataModule],
  controllers: [UserController],
  providers: [
    configProvider,
    AuthService,
    UserService
  ]
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { AuthService } from './auth.service';
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [
    AuthService,
    UserService
  ]
})
export class UserModule {}

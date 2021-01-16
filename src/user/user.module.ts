import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserEntity } from '@/entities';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity])
  ],
  exports: [UserService]
})
export class UserModule {}

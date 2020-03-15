import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';


import User from './users.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [TypeOrmModule.forFeature([User])],
})
export default class UsersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormConfig from '../ormconfig';

import UserModule from './user/user.module';


import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}

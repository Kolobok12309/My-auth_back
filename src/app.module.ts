import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormConfig from '../ormconfig';

import UsersModule from './users/module';


import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}

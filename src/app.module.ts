import { Module } from '@nestjs/common';

import UserModule from './user/user.module';
import DbModule from './db/db.module';

import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [DbModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}

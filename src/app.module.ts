import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';

import UserModule from './user/user.module';
import DbModule from './db/db.module';

import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    DbModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}

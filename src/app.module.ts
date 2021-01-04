import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

import UserModule from './user/user.module';
import DbModule from './db/db.module';

@Module({
  imports: [
    DbModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}

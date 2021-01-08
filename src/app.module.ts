import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DbModule } from '@/db';
import { AuthModule } from '@/auth';
import { FilesModule } from '@/files';
import { UserModule } from '@/user';

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

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DbModule } from '@/db';
import { AuthModule } from '@/auth';
import { FilesModule } from '@/files';
import { UserModule } from '@/user';
import { GroupModule } from '@/group';

@Module({
  imports: [
    DbModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    FilesModule,
    GroupModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}

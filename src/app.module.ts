import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { DbModule } from '@/db';
import { AuthModule } from '@/auth';
import { FilesModule } from '@/files';
import { UserModule } from '@/user';
import { GroupModule } from '@/group';
import { TaskModule } from '@/task';

const isProd = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    UserModule,
    AuthModule,
    FilesModule,
    GroupModule,
    TaskModule,
    DbModule,
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const user = configService.get<string>('MAIL_USER');
        const pass = configService.get<string>('MAIL_PASS');
        const host = configService.get<string>('MAIL_HOST');
        const from = configService.get<string>('MAIL_FROM');

        return {
          transport: {
            host,
            port: 465,
            secure: true,
            auth: {
              user,
              pass,
            }
          },
          defaults: {
            from,
          },
          preview: !isProd,
          template: {
            dir: resolve('./templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            }
          }
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}

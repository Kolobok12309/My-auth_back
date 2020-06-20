import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import UserModule from '@/user/user.module';

import { RefreshTokenEntity } from '@/entities';

import { AuthService, TokenService } from './services';
import { AuthController } from './auth.controller';
import {
  LocalStrategy,
  JwtStrategy,
  JwtCookieStrategy,
  JwtRefreshStrategy,
} from './strategies';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'secret'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    ConfigModule,
  ],
  providers: [
    AuthService,
    TokenService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtCookieStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

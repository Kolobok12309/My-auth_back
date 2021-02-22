import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@/user';
import { RefreshTokenEntity, RestoreRequestEntity } from '@/entities';

import { AuthService, TokenService } from './services';
import { AuthController } from './auth.controller';
import {
  JwtStrategy,
  JwtRefreshStrategy,
} from './strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity, RestoreRequestEntity]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'my_jwt_secret'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    ConfigModule,
  ],
  providers: [
    AuthService,
    TokenService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

import { Controller, Body, Post, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express';

import { UserDto } from '@/user/dto';

import { AuthService } from './auth.service';

import { ITokenUser } from './interfaces';

import { User } from './decorators';

import { SignUpDto } from './dto';
import { JwtRefreshGuard, JwtAuthGuard, LocalGuard } from './guards';

const cookieOptions =  {
  maxAge: 1000 * 60 * 60 * 24,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('signIn')
  @ApiResponse({ status: 201, description: 'User logged in' })
  async signIn(@Res() res: Response, @User() user: ITokenUser) {
    const {
      cookieToken,
      accessToken,
      refreshToken
    } = await this.authService.signIn(user);

    res.cookie('jwt', cookieToken, cookieOptions);

    res.json({
      accessToken,
      refreshToken,
    });
  }

  @Post('signUp')
  @ApiCreatedResponse({ description: 'User registered', type: UserDto })
  async signUp(@Body() registerAuthDto: SignUpDto) {
    return this.authService.signUp(registerAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signOut')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'User logged out' })
  async logout() {}

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiCreatedResponse({ description: 'Pair of updated tokens' })
  async refreshToken(@User() user: ITokenUser) {
    return user;
  }
}

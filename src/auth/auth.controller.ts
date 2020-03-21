import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { UserDto } from '@/user/dto';

import { AuthService } from './auth.service';

import { SignUpDto } from './dto';
import { JwtRefreshGuard, JwtAuthGuard, LocalGuard } from './guards';
@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('signIn')
  @ApiResponse({ status: 201, description: 'User logged in' })
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
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
  async refreshToken(@Request() req) {
    return req.user;
  }
}

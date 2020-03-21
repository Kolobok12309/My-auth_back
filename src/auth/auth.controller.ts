import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

import { User } from '@/user/entities';

import { AuthService } from './auth.service';

import { SignInDto, SignUpDto } from './dto';

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signIn')
  @ApiResponse({ status: 201, description: 'User logged in' })
  async signIn(@Body() signInAuthDto: SignInDto) {
    return this.authService.signIn(signInAuthDto);
  }

  @Post('signUp')
  @ApiCreatedResponse({ description: 'User registered', type: User })
  async signUp(@Body() registerAuthDto: SignUpDto) {
    return this.authService.signUp(registerAuthDto);
  }

  @Post('signOut')
  @ApiResponse({ status: 201, description: 'User logged out' })
  async logout() {

  }
}

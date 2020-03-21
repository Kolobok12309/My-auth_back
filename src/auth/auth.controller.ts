import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { UserDto } from '@/user/dto';

import { AuthService } from './auth.service';

import { SignInDto, SignUpDto } from './dto';

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  @ApiResponse({ status: 201, description: 'User logged in' })
  async signIn(@Body() signInAuthDto: SignInDto) {
    return this.authService.signIn(signInAuthDto);
  }

  @Post('signUp')
  @ApiCreatedResponse({ description: 'User registered', type: UserDto })
  async signUp(@Body() registerAuthDto: SignUpDto) {
    return this.authService.signUp(registerAuthDto);
  }

  @Post('signOut')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'User logged out' })
  async logout() {}
}

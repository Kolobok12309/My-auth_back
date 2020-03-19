import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { SignInUserDto, RegisterUserDto } from './user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signIn')
  async signIn(@Body() signInUserDto: SignInUserDto) {

  }

  @Post('signUp')
  async signUp(@Body() signUpUserDto: RegisterUserDto) {
    console.log(signUpUserDto);
    return this.userService.register(signUpUserDto);
  }

  @Get()
  getAll() {
    return this.userService.findAll();
  }
}

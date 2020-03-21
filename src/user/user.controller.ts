import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import {
  CreateUserDto,
  GetUserParamsDto,
} from './dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {}

  @Get(':id')
  async getUser(@Param('id') { id }: GetUserParamsDto) {}

  // @Put(':id')
  // async updateUser(
  // @Param('id') id: number,
  //   @Body() updateAdminUserDto: UpdateAdminUserDto,
  // ) {}

  // @Put()
  // async updateSelfUser(@Body() updateUserDto: UpdateUserDto) {}

  // @Delete(':id')
  // async deleteUser(@Param('id') id: number) {}

  // @Delete()
  // async deleteSelf() {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }
}

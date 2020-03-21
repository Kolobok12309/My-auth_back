import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiParam, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from './user.service';
import {
  CreateUserDto,
  GetUserParamsDto,
  UserDto
} from './dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'User created', type: UserDto })
  async createUser(@Body() createUserDto: CreateUserDto) {}

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Id of user' })
  async getUser(@Param() { id }: GetUserParamsDto) {
    return this.userService.findById(id);
  }

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
  @ApiQuery({ name: 'page', type: Number, description: 'Page number', required: false })
  @ApiQuery({
    name: 'perPage',
    type: Number,
    description: 'Count of users per page',
    required: false,
  })
  getAll(@Query() { page = 1, perPage = 20 }) {
    return this.userService.findAll(page, perPage);
  }
}

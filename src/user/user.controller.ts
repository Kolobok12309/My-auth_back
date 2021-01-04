import { Controller, Post, Body, Get, Param, Put, Delete, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiParam, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

import { Auth, User } from '@/auth/decorators';

import { ITokenUser } from '@/auth/interfaces';
import { PaginationDto, PaginatedDto, paginatedDtoFactory } from '@/dto';
import { getPageCount } from '@/utils';

import { UserService } from './user.service';
import {
  CreateUserDto,
  GetUserParamsDto,
  UserDto
} from './dto';
import { Roles } from './interfaces';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @Auth([Roles.Admin])
  // @ApiCreatedResponse({ description: 'User created', type: UserDto })
  // async createUser(@Body() createUserDto: CreateUserDto, @User() user: ITokenUser) {
  //   return user;
  // }

  @Get(':id')
  @Auth([Roles.User, Roles.Admin, Roles.Director])
  @ApiParam({ name: 'id', type: Number, description: 'Id of user' })
  @ApiOkResponse({ description: 'Return user by id' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getUser(@Param() { id }: GetUserParamsDto) {
    const user = await this.userService.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
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
  @ApiOkResponse({ type: paginatedDtoFactory(UserDto) })
  async getAll(@Query() { page = 1, perPage = 20 }: PaginationDto): Promise<PaginatedDto<UserDto>> {
    const [users, totalCount] = await this.userService.findAll(page, perPage);

    return {
      items: users,
      meta: {
        page,
        perPage,
        totalCount,
        pageCount: getPageCount(totalCount, perPage),
      },
    };
  }
}

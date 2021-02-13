import { Controller, Post, Body, Get, Param, Patch, Delete, Query, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiParam, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

import { Auth, User } from '@/auth/decorators';
import { ITokenUser } from '@/auth/interfaces';
import { PaginationDto, PaginatedDto, paginatedDtoFactory } from '@/dto';
import { getPageCount } from '@/utils';

import { UserService } from './user.service';
import {
  CreateUserDto,
  GetUserParamsDto,
  UserDto,
  UpdateUserDto,
  SearchUserDto,
  PaginatedFilterUserDto,
  SearchInputUserDto,
} from './dto';
import { Roles } from './interfaces';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth([Roles.Admin, Roles.Director, Roles.User])
  @ApiOkResponse({ type: paginatedDtoFactory(UserDto) })
  async getAll(@Query() {
    page = 1,
    perPage = 20,
    username,
    email,
    role,
    groupId,
  }: PaginatedFilterUserDto): Promise<PaginatedDto<UserDto>> {
    const [users, totalCount] = await this.userService.findAll(page, perPage, {
      username,
      email,
      role,
      groupId,
    });

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

  @Get('search')
  @Auth([Roles.Admin, Roles.Director, Roles.User])
  @ApiOkResponse({ type: SearchUserDto, isArray: true })
  search(@Query() { text, groupId }: SearchInputUserDto): Promise<SearchUserDto[]> {
    return this.userService.search(text, { groupId });
  }

  @Get('self')
  @Auth([Roles.User, Roles.Admin, Roles.Director])
  @ApiOkResponse({ description: 'Return self user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getSelf(@User() { id }: ITokenUser) {
    const user = await this.userService.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Get(':id(\\d+)')
  @Auth([Roles.User, Roles.Admin, Roles.Director])
  @ApiParam({ name: 'id', type: Number, description: 'Id of user' })
  @ApiOkResponse({ description: 'Return user by id' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getUser(@Param() { id }: GetUserParamsDto) {
    const user = await this.userService.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Patch(':id')
  @Auth([Roles.User, Roles.Admin, Roles.Director])
  @ApiParam({ name: 'id', type: Number, description: 'Id of user' })
  @ApiOkResponse({ description: 'Return changed user', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  async updateUser(
  // eslint-disable-next-line @typescript-eslint/indent
    @Param('id') editId: number,
    @Body() updateUserDto: UpdateUserDto,
    @User() { id, role }: ITokenUser,
  ) {
    const isSelfUpdate = editId === id;
    const isAdmin = role === Roles.Admin;
    const isOperationPermitted = isSelfUpdate || isAdmin;

    if (!isOperationPermitted) throw new ForbiddenException();

    const payload = { ...updateUserDto };

    if (!isAdmin) delete payload.role;

    return this.userService.edit(editId, payload);
  }

  @Delete(':id')
  @Auth([Roles.Admin])
  @ApiParam({ name: 'id', type: Number, description: 'Id of user' })
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'User not found' })
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}

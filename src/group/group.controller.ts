import { Controller, Query, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { Auth, User, ITokenUser } from '@/auth';
import { Roles } from '@/user';
import { PaginationDto, PaginatedDto, paginatedDtoFactory } from '@/dto';
import { getPageCount } from '@/utils';

import { GroupService } from './group.service';
import { CreateGroupDto, UpdateGroupDto, GroupDto } from './dto';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(public groupService: GroupService) {}

  @Post()
  @Auth([Roles.Admin, Roles.Director])
  @ApiCreatedResponse({ type: GroupDto })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @Auth([Roles.Admin, Roles.Director, Roles.User])
  @ApiOkResponse({ type: paginatedDtoFactory(GroupDto) })
  async getAll(@Query() { page = 1, perPage = 20 }: PaginationDto): Promise<PaginatedDto<GroupDto>> {
    const [groups, totalCount] = await this.groupService.findAll(page, perPage);

    return {
      items: groups,
      meta: {
        page,
        perPage,
        totalCount,
        pageCount: getPageCount(totalCount, perPage),
      }
    };
  }

  @Get(':id')
  @Auth([Roles.Admin, Roles.Director, Roles.User])
  @ApiParam({ name: 'id', type: Number, description: 'Id of group' })
  @ApiOkResponse({ type: GroupDto })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: number): Promise<GroupDto> {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  @Auth([Roles.Admin, Roles.Director])
  @ApiParam({ name: 'id', type: Number, description: 'Id of group' })
  @ApiOkResponse({ type: GroupDto })
  @ApiNotFoundResponse()
  update(@Param('id') id: number, @Body() updateGroupDto: UpdateGroupDto): Promise<GroupDto> {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @Auth([Roles.Admin, Roles.Director])
  @ApiParam({ name: 'id', type: Number, description: 'Id of group' })
  remove(@Param('id') id: number) {
    return this.groupService.remove(id);
  }
}

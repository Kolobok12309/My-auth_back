import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { TaskEntity } from '@/entities';
import { PaginationDto, PaginatedDto, paginatedDtoFactory } from '@/dto';
import { ITokenUser, User, Auth } from '@/auth';
import { Roles } from '@/user';
import { getPageCount } from '@/utils';

import { TaskService } from './task.service';
import { TaskDto, CreateTaskDto, UpdateTaskDto } from './dto';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Auth([Roles.Admin, Roles.Director])
  @ApiCreatedResponse({ type: TaskDto })
  create(
  // eslint-disable-next-line @typescript-eslint/indent
    @Body() createTaskDto: CreateTaskDto,
    @User() user: ITokenUser,
  ) {
    return this.taskService.create(createTaskDto, user.id);
  }

  @Get()
  @Auth([Roles.Admin, Roles.Director, Roles.User])
  @ApiOkResponse({ type: paginatedDtoFactory(TaskDto) })
  async findAll(@Query() { page = 1, perPage = 20 }: PaginationDto): Promise<PaginatedDto<TaskDto>> {
    const [tasks, totalCount] = await this.taskService.findAll(page, perPage);

    return {
      items: tasks,
      meta: {
        page,
        perPage,
        totalCount,
        pageCount: getPageCount(totalCount, perPage),
      },
    };
  }

  @Get(':id')
  @Auth([Roles.Admin, Roles.Director, Roles.User])
  @ApiParam({ name: 'id', type: Number, description: 'Id of task' })
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: TaskDto })
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  @Auth([Roles.Admin, Roles.Director, Roles.User])
  @ApiParam({ name: 'id', type: Number, description: 'Id of task' })
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: TaskDto })
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @Auth([Roles.Admin, Roles.Director])
  @ApiParam({ name: 'id', type: Number, description: 'Id of task' })
  @ApiNotFoundResponse()
  remove(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}

import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaginationDto, PaginatedDto } from '@/dto';
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
  create(
  // eslint-disable-next-line @typescript-eslint/indent
    @Body() createTaskDto: CreateTaskDto,
    @User() user: ITokenUser,
  ) {
    return this.taskService.create(createTaskDto, user.id);
  }

  @Get()
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
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}

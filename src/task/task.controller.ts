import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { PaginationDto, PaginatedDto, paginatedDtoFactory } from '@/dto';
import { ITokenUser, User, Auth } from '@/auth';
import { Roles, UserService } from '@/user';
import { getPageCount } from '@/utils';

import { TaskService } from './task.service';
import { TaskDto, CreateTaskDto, UpdateTaskDto } from './dto';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

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

  @Patch(':id')
  @Auth([Roles.Admin, Roles.Director, Roles.User])
  @ApiParam({ name: 'id', type: Number, description: 'Id of task' })
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: TaskDto })
  async update(
  // eslint-disable-next-line @typescript-eslint/indent
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @User() user: ITokenUser,
  ) {
    const isPrivilegged = user.role === Roles.Admin || user.role === Roles.Director;
    const oldTask = await this.taskService.findOne(id);

    if (!oldTask) throw new NotFoundException('Task not found');

    if (!isPrivilegged) {
      const {
        group: { id: groupId },
        user: taskUser,
      } = oldTask;
      const { groupId: userGroup } = await this.userService.findById(user.id);

      if (!userGroup)
        throw new ForbiddenException();
      if (groupId !== userGroup)
        throw new ForbiddenException();
      if (taskUser && taskUser.id !== null && taskUser.id !== user.id)
        throw new ForbiddenException();
    }

    const payload = isPrivilegged
      ? updateTaskDto
      : {
        status: updateTaskDto.status
      };

    const saved = await this.taskService.update(id, payload);

    return {
      ...oldTask,
      ...saved,
    };
  }

  @Delete(':id')
  @Auth([Roles.Admin, Roles.Director])
  @ApiParam({ name: 'id', type: Number, description: 'Id of task' })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  remove(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}

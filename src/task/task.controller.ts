import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { Not } from 'typeorm';

import { PaginatedDto, paginatedDtoFactory } from '@/dto';
import { ITokenUser, User, Auth } from '@/auth';
import { Roles, UserService } from '@/user';
import { GroupService } from '@/group';
import { getPageCount } from '@/utils';

import { TaskService } from './task.service';
import { TaskDto, CreateTaskDto, UpdateTaskDto, SearchDto } from './dto';
import { TaskStatus } from './interfaces';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
  ) {}

  @Post()
  @Auth([Roles.Admin, Roles.Director])
  @ApiCreatedResponse({ type: TaskDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async create(
  // eslint-disable-next-line @typescript-eslint/indent
    @Body() createTaskDto: CreateTaskDto,
    @User() user: ITokenUser,
  ) {
    if (createTaskDto.userId) {
      const fullUser = await this.userService.findById(createTaskDto.userId, []);

      if (!fullUser) throw new NotFoundException('User not found');

      if (fullUser.groupId !== createTaskDto.groupId) throw new BadRequestException('User not in this group');
    }

    const fullGroup = await this.groupService.findOne(createTaskDto.groupId, []);

    if (!fullGroup) throw new NotFoundException('Group not found');

    const newTask = await this.taskService.create(createTaskDto, user.id);

    const { group, user: taskUser, title, id } = newTask;

    const mailingOptions = {
      template: 'new-task',
      subject: `Новая задача "${title}"#${id}`,
      context: {
        group,
        task: newTask,
      }
    };

    if (taskUser) {
      await this.userService.mailing(taskUser.id, mailingOptions);
    } else {
      await this.groupService.mailing(group.id, mailingOptions);
    }

    return newTask;
  }

  @Get()
  @Auth([Roles.Admin, Roles.Director, Roles.User])
  @ApiOkResponse({ type: paginatedDtoFactory(TaskDto) })
  async findAll(@Query() {
    page = 1,
    perPage = 20,
    status = Not(TaskStatus.Done),
    groupId,
    userId,
  }: SearchDto): Promise<PaginatedDto<TaskDto>> {
    const [tasks, totalCount] = await this.taskService.findAll(page, perPage, {
      status,
      groupId,
      userId,
    });

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

    if (payload.userId && payload.userId !== oldTask.userId) {
      const fullUser = await this.userService.findById(payload.userId, []);

      if (!fullUser) throw new NotFoundException('User not found');

      const isUserInGroup = (payload.groupId && fullUser.groupId === payload.groupId)
        || fullUser.groupId === oldTask.groupId;
      if (isUserInGroup) throw new BadRequestException('User not in this group');
    }

    if (payload.groupId && payload.groupId !== oldTask.groupId) {
      const fullGroup = await this.groupService.findOne(payload.groupId, []);

      if (!fullGroup) throw new NotFoundException('Group not found');
    }

    const saved = await this.taskService.update(id, payload);

    const fullUpdatedTask = {
      ...oldTask,
      ...saved,
    };

    const { group, user: taskUser, title } = fullUpdatedTask;

    const mailingOptions = {
      template: 'update-task',
      subject: `Задача обновлена "${title}"#${id}`,
      context: {
        group,
        task: fullUpdatedTask,
      }
    };

    if (taskUser) {
      await this.userService.mailing(taskUser.id, mailingOptions);
    } else {
      await this.groupService.mailing(group.id, mailingOptions);
    }

    return fullUpdatedTask;
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

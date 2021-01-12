import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskEntity } from '@/entities';
import { UserModule } from '@/user';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}

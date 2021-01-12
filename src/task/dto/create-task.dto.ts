import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, MinLength, IsNumber, IsOptional, Min, Max, IsDateString, IsArray, IsObject } from 'class-validator';

import { ITask, TaskStatus } from '../interfaces';

export class CreateTaskDto implements ITask {
  @Exclude()
  @IsNumber()
  id;

  @IsString()
  @MinLength(10)
  @ApiProperty({
    minLength: 10,
  })
  title: string;

  @IsString()
  @MinLength(20)
  @ApiProperty({
    minLength: 20,
  })
  description: string;

  @Exclude()
  @IsArray()
  files;

  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number] })
  fileIds: number[];

  @IsNumber()
  @IsOptional()
  @Min(TaskStatus.ToDo)
  @Max(TaskStatus.Expired)
  @ApiProperty({
    required: false,
    description: 'Status of new task',
    default: TaskStatus.ToDo,
  })
  status: TaskStatus;

  @Exclude()
  @IsObject()
  group;

  @IsNumber()
  @ApiProperty()
  groupId: number;

  @Exclude()
  @IsObject()
  user;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  userId?: number;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  deadline?: Date;

  @Exclude()
  @IsDateString()
  createdBy;

  @Exclude()
  @IsDateString()
  createdAt;
}

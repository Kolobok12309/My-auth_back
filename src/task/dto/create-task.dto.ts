import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, MinLength, IsNumber, IsOptional, Min, Max, IsDateString } from 'class-validator';

import { ITask, TaskStatus } from '../interfaces';

export class CreateTaskDto implements ITask {
  @Exclude()
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
  files;

  @IsNumber({}, { each: true })
  @ApiProperty()
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

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  deadline: Date;

  @Exclude()
  createdBy;

  @Exclude()
  createdAt;
}

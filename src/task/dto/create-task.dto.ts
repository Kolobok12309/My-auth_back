import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNumber, IsOptional, Min, Max, IsDateString, IsArray, IsObject } from 'class-validator';

import { TaskStatus } from '../interfaces';

export class CreateTaskDto {
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

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number], default: [], required: false })
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

  @IsNumber()
  @ApiProperty()
  groupId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  userId?: number;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  deadline?: Date;
}

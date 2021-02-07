/* eslint-disable max-classes-per-file */
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString, IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { FindOperator } from 'typeorm';

import { PaginationDto } from '@/dto';

import { TaskStatus } from '../interfaces';

export class FilterDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  title?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(3)
  @Type(() => Number)
  @ApiProperty({
    required: false,
    description: '* ToDo\n* InProgress\n* Done\n * Expired',
    enum: [TaskStatus.ToDo, TaskStatus.InProgress, TaskStatus.Done, TaskStatus.Expired],
  })
  status?: TaskStatus | FindOperator<TaskStatus>;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  userId?: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  groupId?: number;
}

export class SearchDto extends IntersectionType(FilterDto, PaginationDto) {}

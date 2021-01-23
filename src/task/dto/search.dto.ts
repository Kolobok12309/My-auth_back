/* eslint-disable max-classes-per-file */
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';
import { FindOperator } from 'typeorm';

import { PaginationDto } from '@/dto';

import { TaskStatus } from '../interfaces';

export class FilterDto {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    required: false,
    description: 'Filter by status',
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

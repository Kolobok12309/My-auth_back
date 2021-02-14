/* eslint-disable max-classes-per-file */
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '@/dto';

export class FilterGroupDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;
}

export class PaginatedFilterGroupDto extends IntersectionType(FilterGroupDto, PaginationDto) {}

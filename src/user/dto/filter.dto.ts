/* eslint-disable max-classes-per-file */
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumberString, IsString, IsNumber, Min, Max } from 'class-validator';

import { PaginationDto } from '@/dto';

import { Roles } from '../interfaces';

export class FilterUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  email?: string;

  @IsOptional()
  @IsNumber()
  @Min(Roles.Admin)
  @Max(Roles.User)
  @Type(() => Number)
  @ApiProperty({
    required: false,
    enum: [Roles.Admin, Roles.Director, Roles.User]
  })
  role?: Roles;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  groupId?: number;
}

export class PaginatedFilterUserDto extends IntersectionType(FilterUserDto, PaginationDto) {}

/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class SearchInputUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  text?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ required: false })
  groupId?: number;
}

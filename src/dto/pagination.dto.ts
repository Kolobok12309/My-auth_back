import { IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  @ApiProperty({
    required: false,
    description: 'Page number',
    default: 1,
    minimum: 1,
    maximum: 100,
  })
  page?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  @ApiProperty({
    required: false,
    description: 'Count of users per page',
    default: 20,
    minimum: 1,
    maximum: 100,
  })
  perPage?: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  pageCount: number;
}

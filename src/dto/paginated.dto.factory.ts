import { ApiProperty } from '@nestjs/swagger';

import { MetaDto } from '.';

export const paginatedDtoFactory = <T extends Function>(type: T) => {
  class PaginatedDto {
    @ApiProperty({ type: MetaDto })
    meta: MetaDto;

    @ApiProperty({ type: [type] })
    items: T[];
  }

  return PaginatedDto;
};

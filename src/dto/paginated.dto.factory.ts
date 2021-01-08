import { ApiProperty } from '@nestjs/swagger';

import { PaginatedDto } from './paginated.dto';
import { MetaDto } from './meta.dto';

export const paginatedDtoFactory = <T extends Function>(type: T): (new () => PaginatedDto<T>) => {
  class paginatedDto implements PaginatedDto<T> {
    @ApiProperty({ type: MetaDto })
    meta: MetaDto;

    @ApiProperty({ type: [type] })
    items: T[];
  }

  return paginatedDto;
};

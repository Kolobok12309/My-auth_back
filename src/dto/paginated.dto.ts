import { ApiProperty } from '@nestjs/swagger';

import { MetaDto } from './meta.dto';

export class PaginatedDto<T> {
  @ApiProperty({ type: MetaDto })
  meta: MetaDto;

  @ApiProperty()
  items: T[];
}

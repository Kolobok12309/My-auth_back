import { PickType } from '@nestjs/swagger';

import { GroupDto } from './group.dto';

export class SearchGroupDto extends PickType(GroupDto, ['id', 'name'] as const) {}

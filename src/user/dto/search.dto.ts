import { PickType } from '@nestjs/swagger';

import { UserDto } from './user.dto';

export class SearchUserDto extends PickType(UserDto, ['id', 'username'] as const) {}

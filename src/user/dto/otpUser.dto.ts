import { IntersectionType } from '@nestjs/swagger';

import { UserDto, AdditionalUserInfo } from './user.dto';

export class OtpUserDto extends IntersectionType(UserDto, AdditionalUserInfo) {}

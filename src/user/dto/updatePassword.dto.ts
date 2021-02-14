import {
  Length,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PASS_MIN_LENGTH } from '../user.consts';

export class UpdatePasswordDto {
  @IsString()
  @Length(PASS_MIN_LENGTH)
  @ApiProperty({
    description: 'New password'
  })
  password: string;

  @IsOptional()
  @IsString()
  @Length(PASS_MIN_LENGTH)
  @ApiProperty({
    description: 'Old password',
    required: false,
  })
  oldPassword?: string;
}

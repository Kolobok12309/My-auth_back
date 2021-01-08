import { IsNumberString } from 'class-validator';

export class GetUserParamsDto {
  @IsNumberString()
  id: number;
}

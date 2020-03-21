import {
  IsNumberString,
  Min,
} from 'class-validator';

export class GetUserParamsDto {
  @IsNumberString()
  @Min(0)
  id: number;
}

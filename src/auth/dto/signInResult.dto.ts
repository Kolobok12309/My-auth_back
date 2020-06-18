import { ApiProperty } from '@nestjs/swagger';

export class SignInResultDto {
  @ApiProperty({
    description: 'Access token for authorized operations',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token for refresh all tokens',
  })
  refreshToken: string;
}

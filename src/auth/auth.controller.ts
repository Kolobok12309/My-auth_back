import { Controller, Body, Post, UseGuards, UnauthorizedException, Ip, Headers, Get, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiBody, ApiUnauthorizedResponse, ApiHeader } from '@nestjs/swagger';
// eslint-disable-next-line import/no-extraneous-dependencies

import { UserDto } from '@/user/dto';

import { UserService } from '@/user/user.service';

import { AuthService, TokenService } from './services';

import { ITokenUser } from './interfaces';

import { User } from './decorators';

import { SignUpDto, SignInDto, SignInResultDto } from './dto';
import { JwtRefreshGuard, JwtGuard, LocalGuard } from './guards';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signIn')
  @ApiBody({ type: SignInDto })
  @ApiHeader({
    name: 'user-agent',
    required: false,
  })
  @ApiCreatedResponse({
    description: 'User logged in',
    type: SignInResultDto,
  })
  @ApiUnauthorizedResponse({ description: 'Wrong username or password' })
  async signIn(
  // eslint-disable-next-line @typescript-eslint/indent
    @User() { id, username, role }: ITokenUser,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const { id: tokenId } = await this.tokenService.createRefreshToken({
      userId: id,
      userAgent,
      ip,
    });

    const { refreshToken, accessToken } = await this.tokenService.signTokens({
      id,
      tokenId,
      username,
      role,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('signUp')
  @ApiCreatedResponse({ description: 'User registered', type: UserDto })
  async signUp(@Body() registerAuthDto: SignUpDto) {
    return this.authService.signUp(registerAuthDto);
  }

  @UseGuards(JwtGuard)
  @Post('signOut')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'User logged out' })
  async logout(@Headers('Authorization') accessToken: string) {
    const refreshId = this.tokenService.extractIdFromToken(accessToken);

    return this.tokenService.revokeRefreshToken(refreshId);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiBody({ type: RefreshDto })
  @ApiHeader({
    name: 'user-agent',
    required: false,
  })
  @ApiCreatedResponse({ description: 'Pair of updated tokens' })
  @ApiUnauthorizedResponse({ description: 'Wrong refresh token' })
  async refreshToken(
  // eslint-disable-next-line @typescript-eslint/indent
    @User() { id, username, role }: ITokenUser,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
    @Body('refresh_token') token: string,
  ) {
    const tokenId = this.tokenService.extractIdFromToken(token);

    const [isTokenRevoked, userFromDb] = await Promise.all([
      this.tokenService.isRefreshTokenRevoked(tokenId),
      this.userService.findById(id),
    ]);

    if (isTokenRevoked || !userFromDb)
      throw new UnauthorizedException();

    const refreshTokenEntity = await this.tokenService.refreshToken(tokenId, {
      userId: id,
      userAgent,
      ip,
    });

    if (!refreshTokenEntity)
      throw new UnauthorizedException();

    const { accessToken, refreshToken } = await this.tokenService.signTokens({
      id,
      tokenId: refreshTokenEntity.id,
      username,
      role,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  @Get('/token/:id')
  getToken(@Param('id') id: number) {
    return this.tokenService.get(id);
  }
}

import { Controller, Body, Post, UseGuards, UnauthorizedException, Ip, Headers, Get, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiBody, ApiUnauthorizedResponse, ApiHeader } from '@nestjs/swagger';
// eslint-disable-next-line import/no-extraneous-dependencies

import { UserDto } from '@/user/dto';

import { UserService } from '@/user/user.service';
import { Roles } from '@/user/interfaces';

import { AuthService, TokenService } from './services';

import { ITokenUser } from './interfaces';

import { Auth, User } from './decorators';

import { SignUpDto, SignInDto, SignInResultDto } from './dto';
import { JwtRefreshGuard, JwtGuard } from './guards';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

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
  @ApiUnauthorizedResponse()
  async signIn(
  // eslint-disable-next-line @typescript-eslint/indent
    @Body() { username, password }: SignInDto,
    @Ip() ip?: string,
    @Headers('user-agent') userAgent?: string,
  ) {
    const user = await this.authService.validateUser({ username, password });

    if (!user) throw new UnauthorizedException('Wrong username or password');

    const { id: tokenId } = await this.tokenService.createRefreshToken({
      userId: user.id,
      userAgent,
      ip,
    });

    const { refreshToken, accessToken } = await this.tokenService.signTokens({
      id: user.id,
      tokenId,
      username,
      role: user.role,
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

    await this.tokenService.revokeRefreshToken(refreshId);
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
    @Body('refresh_token') token: string,
    @User() { id, username, role }: ITokenUser,
    @Ip() ip?: string,
    @Headers('user-agent') userAgent?: string,
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

  @Auth([Roles.Admin, Roles.Director, Roles.User])
  @Get('/tokens')
  getToken(@User() { id }: ITokenUser) {
    return this.tokenService.getUserTokens(id);
  }
}

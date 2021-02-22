import { Controller, Body, Post, UseGuards, UnauthorizedException, Ip, Headers, Get, Param, Delete, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiBody, ApiUnauthorizedResponse, ApiHeader, ApiOkResponse, ApiNotFoundResponse, ApiConflictResponse, ApiForbiddenResponse } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';

import { Roles, UserService, UserDto } from '@/user';

import { AuthService, TokenService } from './services';
import { ITokenUser, IRefreshTokenUser } from './interfaces';
import { Auth, User } from './decorators';
import { SignUpDto, SignInDto, SignInResultDto, RefreshDto } from './dto';
import { JwtRefreshGuard, JwtGuard } from './guards';

const isDev = process.env.NODE_ENV === 'development';

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly configService: ConfigService
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
    @Body() { login, password }: SignInDto,
    @Ip() ip?: string,
    @Headers('user-agent') userAgent?: string,
  ) {
    const user = await this.authService.validateUser({ login, password });

    if (!user) throw new UnauthorizedException('Wrong username or password');

    const { id: tokenId } = await this.tokenService.createRefreshToken({
      userId: user.id,
      userAgent,
      ip,
    });

    const { refreshToken, accessToken } = await this.tokenService.signTokens({
      id: user.id,
      tokenId,
      username: user.username,
      role: user.role,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('signUp')
  @ApiCreatedResponse({ description: 'User registered', type: UserDto })
  @ApiConflictResponse({ description: 'Email or username is already in use' })
  async signUp(@Body() { email, username, ...etc }: SignUpDto) {
    const [isEmailAvailable, isUsernameAvailable] = await Promise.all([
      this.userService.isEmailAvailable(email),
      this.userService.isUsernameAvailable(username),
    ]);

    if (!isEmailAvailable) throw new ConflictException('Email is already in use');
    if (!isUsernameAvailable) throw new ConflictException('Username is already in use');

    return this.userService.create({
      ...etc,
      email,
      username,
      role: Roles.User,
    });
  }

  @UseGuards(JwtGuard)
  @Post('signOut')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'User logged out' })
  async logout(@Headers('Authorization') bearer: string) {
    const accessToken = this.tokenService.extractTokenFromBearer(bearer);
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
    @User() { id }: IRefreshTokenUser,
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
      username: userFromDb.username,
      role: userFromDb.role,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  @Get('/tokens')
  @Auth([Roles.Admin, Roles.Director, Roles.User])
  @ApiOkResponse({ description: 'List of active tokens' })
  getTokens(@User() { id }: ITokenUser) {
    return this.tokenService.getUserTokens(id);
  }

  @Get('/tokens/:userId')
  @Auth([Roles.Admin])
  @ApiOkResponse({ description: 'List of user active tokens' })
  getUserTokens(@Param('userId') userId: number) {
    return this.tokenService.getUserTokens(userId);
  }

  @Delete('/tokens/:id')
  @Auth([Roles.Admin, Roles.Director, Roles.User])
  @ApiOkResponse({ description: 'Token successfully revoked' })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  async revokeToken(@User() { id, role }: ITokenUser, @Param('id') tokenId: number) {
    const token = await this.tokenService.get(tokenId);

    if (!token) throw new NotFoundException('Token not found');
    if (role !== Roles.Admin && token.userId !== id) throw new ForbiddenException();

    await this.tokenService.revokeRefreshToken(tokenId);
  }

  @Post('restore/start')
  @ApiCreatedResponse({
    description: 'Restore request created',
  })
  @ApiNotFoundResponse()
  async passwordRestoreStart(@Body() { login, password }: SignInDto) {
    const user = await this.userService.findByLogin(login);

    if (!user) throw new NotFoundException('User not found');

    // TODO Изменить логику генерации секретной строки
    const { uuid } = await this.authService.createRestoreRequest(user.id, password);

    await this.userService.mailing(user.id, {
      template: 'password-restore',
      subject: 'Восстановление пароля',
      context: {
        code: uuid,
      },
    });

    if (isDev || this.configService.get<string>('MAIL', 'true') === 'false') {
      return {
        code: uuid,
      };
    }
  }

  @Post('restore/end')
  @ApiCreatedResponse({
    description: 'Restore request created',
  })
  @ApiNotFoundResponse()
  async passwordRestoreEnd(
  // eslint-disable-next-line @typescript-eslint/indent
    @Body('code') code: string,
    @Ip() ip?: string,
    @Headers('user-agent') userAgent?: string,
  ) {
    const restoreRequest = await this.authService.applyRestoreRequest(code);

    if (!restoreRequest) throw new NotFoundException('Restore request not found');

    const { user } = restoreRequest;

    const { id: tokenId } = await this.tokenService.createRefreshToken({
      userId: user.id,
      userAgent,
      ip,
    });

    const { refreshToken, accessToken } = await this.tokenService.signTokens({
      id: user.id,
      tokenId,
      username: user.username,
      role: user.role,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

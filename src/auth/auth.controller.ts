import { Controller, Body, Post, UseGuards, Res, UnauthorizedException, Ip, Headers, Get, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiBody, ApiUnauthorizedResponse, ApiHeader } from '@nestjs/swagger';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express';

import { UserDto } from '@/user/dto';

import { UserService } from '@/user/user.service';

import { AuthService, TokenService } from './services';

import { ITokenUser } from './interfaces';

import { User } from './decorators';

import { SignUpDto, SignInDto, SignInResultDto } from './dto';
import { JwtRefreshGuard, JwtAuthGuard, LocalGuard } from './guards';

const cookieOptions =  {
  maxAge: 1000 * 60 * 60 * 24,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

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
    headers: {
      jwt: {
        description: 'Jwt cookie token for get requests',
        schema: {
          type: 'string',
        }
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Wrong username or password' })
  async signIn(
  // eslint-disable-next-line @typescript-eslint/indent
    @Res() res: Response,
    @User() user: ITokenUser,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const {
      cookieToken,
      accessToken,
      refreshToken
    } = await this.tokenService.generateTokens({
      user,
      userAgent,
      ip,
    });

    res.cookie('jwt', cookieToken, cookieOptions);

    res.json({
      accessToken,
      refreshToken,
    });
  }

  @Post('signUp')
  @ApiCreatedResponse({ description: 'User registered', type: UserDto })
  async signUp(@Body() registerAuthDto: SignUpDto) {
    return this.authService.signUp(registerAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signOut')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'User logged out' })
  async logout(@Headers('Authorization') accessToken: string) {
    const refreshId = this.tokenService.extractIdFromToken(accessToken);

    return this.tokenService.revokeRefreshToken(refreshId);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiCreatedResponse({ description: 'Pair of updated tokens' })
  async refreshToken(
  // eslint-disable-next-line @typescript-eslint/indent
    @User() user: ITokenUser,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
    @Res() res: Response,
    @Body('refresh_token') token: string,
  ) {
    const tokenId = this.tokenService.extractIdFromToken(token);

    const [isNotRevokedToken, userFromDb] = await Promise.all([
      this.tokenService.validateRefreshToken(tokenId),
      this.userService.findById(user.id),
    ]);

    if (!isNotRevokedToken || !userFromDb)
      throw new UnauthorizedException();

    const [{
      accessToken,
      refreshToken,
      cookieToken,
    }] = await Promise.all([
      this.tokenService.generateTokens({
        user: userFromDb,
        ip,
        userAgent,
      }),
      this.tokenService.revokeRefreshToken(tokenId),
    ]);

    res.cookie('jwt', cookieToken, cookieOptions);

    res.json({
      accessToken,
      refreshToken,
    });
  }

  @Get('/token/:id')
  getToken(@Param('id') id: number) {
    return this.tokenService.get(id);
  }
}

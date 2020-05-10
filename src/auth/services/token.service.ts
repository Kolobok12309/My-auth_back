import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RefreshTokenEntity } from '@/entities';

import { ITokenUser } from '../interfaces';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly tokenRepo: Repository<RefreshTokenEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens({
    user,
    userAgent = null,
    ip = null,
  } : {
    user: ITokenUser,
    userAgent?: string,
    ip?: string
  }) {
    const { username, id, role } = user;

    const refreshTokenRaw = this.tokenRepo.create({
      userId: id,
      userAgent,
      ip,
    });

    const { id: tokenId } = await this.tokenRepo
      .save(refreshTokenRaw);
      // .then(({ generatedMaps }) => generatedMaps[0] as RefreshTokenEntity);

    const payload = { username, id, role, tokenId };

    const [refreshToken, accessToken, cookieToken] = await Promise.all([
      this.jwtService.signAsync({ id, tokenId, type: 'refresh' }, { expiresIn: '7d' }),
      this.jwtService.signAsync({ ...payload, type: 'access' }),
      this.jwtService.signAsync({ ...payload, type: 'cookie' }),
    ]);

    return {
      accessToken,
      refreshToken,
      cookieToken,
    };
  }

  async validateRefreshToken(id: number): Promise<boolean> {
    const foundToken = await this.tokenRepo.findOne(id);

    console.log(foundToken);

    return Boolean(foundToken);
  }

  async revokeRefreshToken(tokenId: number) {
    const foundToken = await this.tokenRepo.findOne(tokenId);

    if (!foundToken) return;

    await this.tokenRepo.remove(foundToken);
  }

  extractIdFromToken(token: string): number | null {
    const decoded = this.jwtService.decode(token);

    if (!decoded || typeof decoded === 'string') return null;

    return decoded.tokenId;
  }

  get(id: number) {
    return this.tokenRepo.findOne(id, {
      relations: ['user']
    });
  }
}

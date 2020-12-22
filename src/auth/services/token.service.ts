import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { RefreshTokenEntity } from '@/entities';

import { Roles } from '@/user/interfaces';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly tokenRepo: Repository<RefreshTokenEntity>,
    private readonly jwtService: JwtService,
    private readonly connection: Connection,
  ) {}

  createRefreshToken({
    userId,
    userAgent = null,
    ip = null,
  } : {
    userId: number,
    userAgent?: string,
    ip?: string
  }) {
    const rawRefreshToken = this.tokenRepo.create({
      userId,
      userAgent,
      ip
    });

    return this.tokenRepo.save(rawRefreshToken);
  }

  async signTokens({
    id,
    tokenId,
    username,
    role
  }: {
    id: number,
    tokenId: number,
    username: string,
    role: Roles
  }) {
    const [refreshToken, accessToken] = await Promise.all([
      this.jwtService.signAsync({ id, tokenId, type: 'refresh' }, { expiresIn: '7d' }),
      this.jwtService.signAsync({ id, tokenId, username, role, type: 'access' }),
    ]);

    return {
      refreshToken,
      accessToken,
    };
  }

  revokeRefreshToken(id: number) {
    return this.tokenRepo.delete(id);
  }

  extractIdFromToken(token: string): number | null {
    const decoded = this.jwtService.decode(token);

    if (!decoded || typeof decoded === 'string') return null;

    return decoded.tokenId;
  }

  // eslint-disable-next-line consistent-return
  async refreshToken(id: number, {
    userId,
    userAgent = null,
    ip = null,
  } : {
    userId: number,
    userAgent?: string,
    ip?: string
  }) {
    const rawRefreshToken = this.tokenRepo.create({
      userId,
      userAgent,
      ip,
    });

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [refreshToken] = await Promise.all([
        queryRunner.manager.save(rawRefreshToken),
        queryRunner.manager.delete(RefreshTokenEntity, id),
      ]);

      await queryRunner.commitTransaction();

      return refreshToken;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async isRefreshTokenRevoked(id: number): Promise<boolean> {
    const foundToken = await this.tokenRepo.findOne(id);

    return !foundToken;
  }

  get(id: number) {
    return this.tokenRepo.findOne(id, {
      relations: ['user']
    });
  }
}

import { promisify } from 'util';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { UserService, UserDto, SALT_ROUNDS } from '@/user';

import { RestoreRequestEntity } from '@/entities';

import { ISignIn } from '../interfaces';

const asyncHash = promisify(hash);
const asyncCompare = promisify(compare);

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(RestoreRequestEntity)
    private readonly restoreRequestsRepo: Repository<RestoreRequestEntity>,
  ) {}

  async validateUser({
    login,
    password: inPassword,
  }: ISignIn): Promise<UserDto | null> {
    try {
      const user = await this.userService.findByLogin(login);

      const isPassRight = await asyncCompare(inPassword, user.password);

      if (isPassRight) {
        const { password, ...result } = user;

        return result;
      }

      return null;
    } catch (err) {
      return null;
    }
  }

  async createRestoreRequest(userId, password) {
    const [hashedPassword] = await Promise.all([
      asyncHash(password, SALT_ROUNDS),
      this.restoreRequestsRepo.delete({
        userId,
      }),
    ]);

    return this.restoreRequestsRepo.save({
      userId,
      password: hashedPassword,
    });
  }

  async applyRestoreRequest(uuid: string) {
    const restoreRequest = await this.restoreRequestsRepo.findOne(uuid, {
      relations: ['user'],
    });

    if (!restoreRequest) return null;

    await Promise.all([
      this.userService.updatePassword(restoreRequest.userId, restoreRequest.password),
      this.restoreRequestsRepo.delete(restoreRequest.uuid),
    ]);

    return restoreRequest;
  }
}

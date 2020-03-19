import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import User from './user.entity';
import { RegisterUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async register(user: RegisterUserDto): Promise<any> {
    const { generatedMaps } = await this.userRepo.insert(user);

    const result = this.userRepo.merge(new User(), user, generatedMaps[0]);

    return result;
  }
}

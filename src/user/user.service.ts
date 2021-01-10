import { promisify } from 'util';

import { authenticator } from 'otplib';
import { hash } from 'bcrypt';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';

import { IMailingOptions } from '@/interfaces';
import { UserEntity } from '@/entities';

import { SALT_ROUNDS } from './user.consts';
import { ICreateUser, IUpdateUser, Roles } from './interfaces';
import { OtpUserDto, UserDto } from './dto';

const asyncHash = promisify(hash);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly mailerService: MailerService,
  ) {}

  findAll(page: number = 1, perPage: number = 20): Promise<[UserDto[], number]> {
    return this.userRepo.findAndCount({
      take: perPage,
      skip: perPage * (page - 1),
    });
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    return !(await this.userRepo.findOne({
      where: {
        username,
      }
    }));
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    return !(await this.userRepo.findOne({
      where: {
        email,
      }
    }));
  }

  async findById(id: number): Promise<UserDto> {
    return this.userRepo.findOne(id, {
      relations: ['tokens', 'group'],
    });
  }

  async findByLogin(login: string): Promise<UserEntity> {
    return this.userRepo.findOne({
      where: [
        { username: login },
        { email: login },
      ],
      select: ['password', 'username', 'role', 'email', 'id', 'createdAt'],
    });
  }

  async create({ email, username, password, role = Roles.User }: ICreateUser): Promise<OtpUserDto> {
    const hashedPass = await asyncHash(password, SALT_ROUNDS);
    const otpSecret = authenticator.generateSecret();

    const { generatedMaps } = await this.userRepo.insert({
      username,
      role,
      email,
      password: hashedPass,
      otp: otpSecret,
    });

    return {
      username,
      role,
      email,
      otp: otpSecret,
      ...generatedMaps[0],
    } as OtpUserDto;
  }

  async edit(id: number, { email, role, groupId }: IUpdateUser): Promise<UserDto> {
    const oldUser = await this.userRepo.findOne(id);

    if (!oldUser) throw new NotFoundException('User not found');

    return this.userRepo.save({
      id,
      email,
      role,
      groupId,
    });
  }

  async delete(id: number) {
    const { affected } = await this.userRepo.delete(id);

    if (!affected) throw new NotFoundException('User not found');

    return true;
  }

  async mailing(id: number, {
    template,
    subject,
    context = {},
  }: IMailingOptions) {
    const user = await this.userRepo.findOne(id, {
      relations: ['group']
    });

    if (!user) throw new NotFoundException('User not found');

    await this
      .mailerService
      .sendMail({
        to: user.email,
        subject,
        template,
        context: {
          user,
          ...context,
        }
      })
      .catch(err => {
        console.error(err);

        throw new InternalServerErrorException('Error while user mailing');
      });
  }
}

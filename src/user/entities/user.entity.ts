import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Roles, IUser } from '../interfaces/user.interface';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Index({ unique: true })
  @Column({ unique: true, update: false })
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty({
    description: 'Hash of user password',
  })
  password: string;

  @Column({ default: Roles.User })
  @ApiProperty({
    description: 'User role'
  })
  role: Roles;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Date of creating user'
  })
  createdAt: Date;
}

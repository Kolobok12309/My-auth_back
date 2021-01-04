import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, Index, OneToMany } from 'typeorm';

import { Roles, IUser } from '@/user/interfaces';

import { RefreshTokenEntity, FileEntity } from '.';

@Entity('users')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ unique: true, update: false })
  username: string;

  @Index({ unique: true })
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  otp: string;

  @Column({ default: Roles.User, type: 'integer' })
  role: Roles;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => RefreshTokenEntity, token => token.user)
  tokens: RefreshTokenEntity[];

  @OneToMany(() => FileEntity, file => file.user)
  files: FileEntity[];
}

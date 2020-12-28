import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, Index, OneToMany } from 'typeorm';

import { Roles, IUser } from '@/user/interfaces/user.interface';

// eslint-disable-next-line import/no-cycle
import { RefreshTokenEntity } from './refresh-token.entity';

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

  @Column({ default: Roles.User, type: 'integer' })
  role: Roles;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => RefreshTokenEntity, token => token.user)
  tokens: RefreshTokenEntity[];
}

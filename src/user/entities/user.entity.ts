import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

import { Roles, IUser } from '../interfaces/user.interface';

@Entity('users')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ unique: true, update: false })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: Roles.User })
  role: Roles;

  @CreateDateColumn()
  createdAt: Date;
}

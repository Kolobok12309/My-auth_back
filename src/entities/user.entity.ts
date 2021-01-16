import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, Index, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { Roles, IUser } from '@/user/interfaces';

import { TaskEntity } from './task.entity';

import { RefreshTokenEntity, FileEntity, GroupEntity } from '.';

@Entity('users')
export class UserEntity implements IUser {
  constructor(id) {
    this.id = id;
  }

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

  @Column({ select: false, nullable: true })
  otp?: string;

  @Column({ default: Roles.User, type: 'integer' })
  role: Roles;

  @ManyToOne(() => GroupEntity, group => group.users, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'groupId' })
  group?: GroupEntity;

  @Column({ nullable: true })
  groupId?: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => RefreshTokenEntity, token => token.user)
  tokens: RefreshTokenEntity[];

  @OneToMany(() => FileEntity, file => file.user)
  files: FileEntity[];

  @OneToMany(() => TaskEntity, task => task.user)
  tasks: TaskEntity[];
}

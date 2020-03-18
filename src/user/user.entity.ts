import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

import { Roles } from './user.dto';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ unique: true, update: false })
  username: string;

  @Column()
  password: string;

  @Column({ default: Roles.User })
  role: Roles;

  @CreateDateColumn()
  createdAt: Date;
}

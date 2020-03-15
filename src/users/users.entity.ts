import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export const enum Roles {
  Root,
  Admin,
  Editor,
  User,
}

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, update: false })
  username: string;

  @Column()
  password: string;

  @Column({ default: Roles.User })
  role: Roles;

  @CreateDateColumn()
  createdAt: Date;
}

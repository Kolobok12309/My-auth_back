import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { IFile } from '@/files';

import { UserEntity } from '.';

@Entity('files')
export class FileEntity implements IFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, user => user.files)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}

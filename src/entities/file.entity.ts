import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { IFile } from '@/files/interfaces';

import { UserEntity, TaskEntity } from '.';

@Entity('files')
export class FileEntity implements IFile {
  constructor(id) {
    this.id = id;
  }

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

  @ManyToOne(() => TaskEntity, task => task.files, { nullable: true })
  @JoinColumn()
  task: TaskEntity;
}

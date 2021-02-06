import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { IFile } from '@/files/interfaces';

import { UserEntity, TaskEntity } from '.';

@Entity('files', {
  orderBy: {
    createdAt: 'DESC',
  },
})
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

  @Column({ nullable: true })
  userId?: number;

  @ManyToOne(() => UserEntity, user => user.files, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @ManyToOne(() => TaskEntity, task => task.files, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  task: TaskEntity;
}

import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { ITask, TaskStatus } from '@/task/interfaces';

import { UserEntity, FileEntity, GroupEntity } from '.';

@Entity('tasks', {
  orderBy: {
    createdAt: 'DESC',
    title: 'ASC',
  }
})
export class TaskEntity implements ITask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => FileEntity, file => file.task, {
    eager: true,
  })
  files: FileEntity[];

  @Column({ default: TaskStatus.ToDo, type: 'integer' })
  status: TaskStatus;

  @ManyToOne(() => GroupEntity, group => group.tasks, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  group: GroupEntity;

  @Column()
  groupId: number;

  @ManyToOne(() => UserEntity, user => user.tasks, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  user?: UserEntity;

  @Column({ nullable: true, })
  userId?: number;

  @Column({ nullable: true })
  deadline?: Date;

  @ManyToOne(() => UserEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  createdBy?: UserEntity;

  @Column({ nullable: true })
  createdById?: number;

  @CreateDateColumn()
  createdAt: Date;
}

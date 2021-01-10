import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { IGroup } from '@/group/interfaces';

import { UserEntity, TaskEntity } from '.';

@Entity('groups')
export class GroupEntity implements IGroup {
  constructor(id) {
    this.id = id;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  name: string;

  @OneToMany(() => UserEntity, user => user.group)
  users: UserEntity[];

  @OneToMany(() => TaskEntity, task => task.group)
  tasks: TaskEntity[];
}

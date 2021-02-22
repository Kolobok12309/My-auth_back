import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';

import { UserEntity } from '.';

@Entity('restore-requests')
export class RestoreRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => UserEntity, user => user.restoreRequests, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Index()
  @Column()
  userId: number;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}

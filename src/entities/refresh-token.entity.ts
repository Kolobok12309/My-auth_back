import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { UserEntity } from './user.entity';

@Entity('refresh-tokens')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.tokens, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: number;

  @Column({ nullable: true })
  userAgent?: string;

  @Column({ nullable: true })
  ip?: string;

  @CreateDateColumn()
  createdAt: Date;
}
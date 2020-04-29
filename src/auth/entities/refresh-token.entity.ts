import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity('refresh-tokens')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ unique: true, update: false })
  token: string;

  @CreateDateColumn()
  createdAt: Date;
}

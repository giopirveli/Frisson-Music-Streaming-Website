import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Music } from 'src/music/entities/music.entity';

@Entity('listeners')
export class Listener {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.listeners, { eager: true })
  user: User;

  @ManyToOne(() => Music, (music) => music.listeners, { eager: true })
  music: Music;

  @Column({ default: 0 })
  playCount: number;
}

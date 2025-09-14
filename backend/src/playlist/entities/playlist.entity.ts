import { BaseEntity } from 'src/common/base.entity';
import { PlaylistType } from 'src/common/playlist.enum';
import { Music } from 'src/music/entities/music.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('playlist')
export class Playlist extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: PlaylistType, default: PlaylistType.CUSTOM })
  type: PlaylistType;

  @ManyToOne(() => User, (user) => user.playlists, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Music)
  @JoinTable()
  music: Music[];
}

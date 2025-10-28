import { BaseEntity } from 'src/common/base.entity';
import { PlaylistType } from 'src/playlist/playlist.enum';
import { Music } from 'src/music/entities/music.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity('playlists')
export class Playlist extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: PlaylistType, default: PlaylistType.FAVORITES })
  type: PlaylistType;

  @Column()
  imageUrl: string;

  @ManyToOne(() => User, (user) => user.playlists, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Music)
  @JoinTable({ name: 'playlist_tracks' })
  music: Music[];
}

import { BaseEntity } from 'src/common/base.entity';
import { Listener } from 'src/listeners-table/entities/listeners-table.entity';
import { Music } from 'src/music/entities/music.entity';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Role } from 'src/roles/roles';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Listener, (listener) => listener.user)
  listeners: Listener[];

  @OneToMany(() => Playlist, (playlist) => playlist.user, {
    onDelete: 'CASCADE',
  })
  playlists: Playlist[];

  @OneToMany(() => Music, (music) => music.user)
  music: Music[];
}

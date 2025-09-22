import { Album } from 'src/album/entities/album.entity';
import { BaseEntity } from 'src/common/base.entity';
import { Listener } from 'src/listeners-table/entities/listeners-table.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('music')
export class Music extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'int', default: 0 })
  duration?: number;

  @OneToMany(() => Listener, (listener) => listener.user)
  listeners: Listener[];

  @ManyToOne(() => Album, (album) => album.music, { nullable: true })
  album: Album;

  @ManyToOne(() => User, (user) => user.music, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => User, (user) => user.likedMusic)
  likedByUsers: User[];
}

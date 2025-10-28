import { Album } from 'src/album/entities/album.entity';
import { Author } from 'src/author/entities/author.entity';
import { BaseEntity } from 'src/common/base.entity';
import { Listener } from 'src/listeners-table/entities/listeners-table.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity('music')
export class Music extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'int', default: 0 })
  duration?: number;

  @Column({ nullable: true })
  trackFileName: string;

  @Column({ nullable: true })
  trackKey: string;

  @Column({ nullable: true })
  trackBucket: string;

  @Column({ type: 'text', nullable: true })
  trackUrl: string;

  @OneToMany(() => Listener, (listener) => listener.user)
  listeners: Listener[];

  @ManyToOne(() => Album, (album) => album.music, { nullable: true })
  album: Album;

  @ManyToOne(() => User, (user) => user.music, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Author, (author) => author.music, { nullable: true })
  author: Author;

  @ManyToMany(() => User, (user) => user.likedMusic)
  likedByUsers: User[];
}

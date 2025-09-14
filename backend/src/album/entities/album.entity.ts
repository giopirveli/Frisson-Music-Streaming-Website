import { Author } from 'src/author/entities/author.entity';
import { BaseEntity } from 'src/common/base.entity';
import { Music } from 'src/music/entities/music.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('albums')
export class Album extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  releaseDate: string;

  @Column()
  artistName: string;

  @ManyToOne(() => Author, (author) => author.albums, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @OneToMany(() => Music, (music) => music.album)
  music: Music[];
}

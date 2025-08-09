import { Author } from 'src/author/entities/author.entity';
import { Music } from 'src/music/entities/music.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseDate: string;

  @Column()
  artistName: string;

  @ManyToOne(() => Author, (author) => author.albums, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @OneToMany(() => Music, (music) => music.album)
  music: Music[];
}

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

  @Column({ nullable: true })
  coverFileName: string;

  @Column({ nullable: true })
  coverKey: string;

  @Column({ nullable: true })
  coverBucket: string;

  @Column({ type: 'text', nullable: true })
  coverUrl: string;

  @ManyToOne(() => Author, (author) => author.albums, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @OneToMany(() => Music, (music) => music.album)
  music: Music[];
}

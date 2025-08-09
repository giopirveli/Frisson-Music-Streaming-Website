import { Album } from 'src/album/entities/album.entity';
import { Music } from 'src/music/entities/music.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  url?: string;

  @OneToMany(() => Music, (music) => music.author)
  music: Music[];

  @OneToMany(() => Album, (album) => album.author)
  albums: Album[];
}

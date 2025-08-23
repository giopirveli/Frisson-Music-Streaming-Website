import { Album } from 'src/album/entities/album.entity';
import { Author } from 'src/author/entities/author.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('music')
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Author, (author) => author.music, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @ManyToOne(() => Album, (album) => album.music, { nullable: true })
  album: Album;

  @ManyToOne(() => User, (user) => user.music, { onDelete: 'CASCADE' })
  user: User;
}

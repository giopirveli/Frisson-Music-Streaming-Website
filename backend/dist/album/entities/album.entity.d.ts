import { Author } from 'src/author/entities/author.entity';
import { Music } from 'src/music/entities/music.entity';
export declare class Album {
    id: number;
    title: string;
    releaseDate: string;
    artistName: string;
    author: Author;
    music: Music[];
}

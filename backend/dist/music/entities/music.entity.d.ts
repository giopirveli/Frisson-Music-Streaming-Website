import { Album } from 'src/album/entities/album.entity';
import { Author } from 'src/author/entities/author.entity';
export declare class Music {
    id: number;
    title: string;
    url?: string;
    author: Author;
    album: Album;
}

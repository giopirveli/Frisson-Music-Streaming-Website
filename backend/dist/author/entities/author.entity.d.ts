import { Album } from 'src/album/entities/album.entity';
import { Music } from 'src/music/entities/music.entity';
export declare class Author {
    id: number;
    name: string;
    url?: string;
    music: Music[];
    albums: Album[];
}

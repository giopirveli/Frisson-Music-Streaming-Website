import { SearchMusicDto } from './dto/search-music.dto';
import { AuthorRepository } from 'src/author/author.repository';
import { MusicRepository } from 'src/music/music.repository';
import { AlbumRepository } from 'src/album/albums.repository';
export declare class SearchService {
    private readonly authorRepo;
    private readonly musicRepo;
    private readonly albumRepo;
    constructor(authorRepo: AuthorRepository, musicRepo: MusicRepository, albumRepo: AlbumRepository);
    search({ query }: SearchMusicDto): Promise<{
        music: import("../music/entities/music.entity").Music[];
        authors: import("../author/entities/author.entity").Author[];
        albums: import("../album/entities/album.entity").Album[];
    }>;
}

import { SearchService } from './search.service';
import { SearchMusicDto } from './dto/search-music.dto';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(searchMusicDto: SearchMusicDto): Promise<{
        music: import("../music/entities/music.entity").Music[];
        authors: import("../author/entities/author.entity").Author[];
        albums: import("../album/entities/album.entity").Album[];
    }>;
}

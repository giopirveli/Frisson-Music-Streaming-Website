import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchMusicDto } from './dto/search-music.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Query() searchMusicDto: SearchMusicDto) {
    return this.searchService.search(searchMusicDto);
  }
}

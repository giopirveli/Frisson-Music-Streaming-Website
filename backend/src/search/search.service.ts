import { Injectable } from '@nestjs/common';
import { SearchMusicDto } from './dto/search-music.dto';
import { AuthorRepository } from 'src/author/author.repository';
import { MusicRepository } from 'src/music/music.repository';
import { AlbumRepository } from 'src/album/albums.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly authorRepo: AuthorRepository,
    private readonly musicRepo: MusicRepository,
    private readonly albumRepo: AlbumRepository,
  ) {}

  async search({ query }: SearchMusicDto) {
    return {
      music: await this.musicRepo.search(query || ''),
      authors: await this.authorRepo.search(query || ''),
      albums: await this.albumRepo.search(query || ''),
    };
  }
}

import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { AuthorModule } from 'src/author/author.module';
import { AlbumsModule } from 'src/album/albums.module';
import { MusicModule } from 'src/music/music.module';

@Module({
  imports: [AuthorModule, AlbumsModule, MusicModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}

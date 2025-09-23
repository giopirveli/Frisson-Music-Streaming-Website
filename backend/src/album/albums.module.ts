import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { AuthorModule } from 'src/author/author.module';
import { AlbumRepository } from './albums.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), AuthorModule],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumRepository],
  exports: [AlbumRepository],
})
export class AlbumsModule {}

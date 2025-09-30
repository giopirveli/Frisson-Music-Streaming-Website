import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { AuthorModule } from 'src/author/author.module';
import { MusicRepository } from './music.repository';
import { User } from 'src/users/entities/user.entity';
import { AlbumsModule } from 'src/album/albums.module';
import { S3Module } from 'src/common/s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Music, User]),
    AuthorModule,
    AlbumsModule,
    S3Module,
  ],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository],
  exports: [MusicRepository, MusicService],
})
export class MusicModule {}

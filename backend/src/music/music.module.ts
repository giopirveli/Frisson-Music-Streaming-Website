import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { AuthorModule } from 'src/author/author.module';
import { MusicRepository } from './music.repository';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Music, User]), AuthorModule],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository],
  exports: [MusicRepository],
})
export class MusicModule {}

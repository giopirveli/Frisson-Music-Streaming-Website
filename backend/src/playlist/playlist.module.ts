import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { User } from 'src/users/entities/user.entity';
import { Music } from 'src/music/entities/music.entity';
import { PlaylistRepository } from './playlist.repository';
import { UsersModule } from 'src/users/users.module';
import { ListenersTableModule } from 'src/listeners-table/listeners-table.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist, User, Music]),
    UsersModule,
    ListenersTableModule,
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository],
})
export class PlaylistModule {}

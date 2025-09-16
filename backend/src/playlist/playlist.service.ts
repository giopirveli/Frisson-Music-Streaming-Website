import { Injectable } from '@nestjs/common';
import { PlaylistRepository } from './playlist.repository';
import { PlaylistType } from 'src/common/playlist.enum';
import { Playlist } from './entities/playlist.entity';
import { User } from 'src/users/entities/user.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(private readonly playlistRepo: PlaylistRepository) {}

  async create(user: User, createPlaylistDto: CreatePlaylistDto) {
    const playlist: Partial<Playlist> = {
      title: createPlaylistDto.title,
      user,
      type: createPlaylistDto.type || PlaylistType.FAVORITES,
    };
    if (createPlaylistDto.musicId?.length) {
      playlist.music = await this.playlistRepo.findMusicByIds(createPlaylistDto.musicId);
    }
    return this.playlistRepo.create(playlist);
  }

  async generate(userId: number, type: PlaylistType) {
    let music;
    switch (type) {
      case PlaylistType.FAVORITES:
        music = await this.playlistRepo.findFavoritesByUser(userId);
        break;
      case PlaylistType.TOP_CHARTS:
        music = await this.playlistRepo.findTopCharts();
        break;
      case PlaylistType.TOP_HITS:
        music = await this.playlistRepo.findTopHits();
        break;
      case PlaylistType.RECOMMENDATIONS:
        music = await this.playlistRepo.findRecommendations(userId);
        break;
      default:
        throw new Error(`Type ${type} not supported`);
    }

    return {
      title: type.replace('_', ' '),
      type,
      music,
    };
  }

  async getUserPlaylists(userId: number) {
    return this.playlistRepo.findByUser(userId);
  }

  async getAll() {
    return this.playlistRepo.findAll();
  }

  async update(id: number, updatePlaylistDto: Partial<Playlist>) {
    return this.playlistRepo.update(id, updatePlaylistDto);
  }

  async delete(id: number) {
    return this.playlistRepo.delete(id);
  }
}

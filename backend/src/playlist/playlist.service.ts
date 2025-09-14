import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './playlist.repository';
import { PlaylistType } from 'src/common/playlist.enum';

@Injectable()
export class PlaylistService {
  constructor(private readonly playlistRepo: PlaylistRepository) {}

  async create(userId: number, createPlaylistDto: CreatePlaylistDto) {
    return this.playlistRepo.create(createPlaylistDto, userId);
  }

  async findAll() {
    return this.playlistRepo.findAll();
  }

  async findOne(id: number) {
    return this.playlistRepo.findOne(id);
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistRepo.update(id, updatePlaylistDto);
  }

  async getUserPlaylists(userId: number) {
    return this.playlistRepo.findByUser(userId);
  }

  async filter(filters: {
    userId?: number;
    type?: PlaylistType;
    title?: string;
  }) {
    return this.playlistRepo.filterPlaylists(filters);
  }

  async delete(id: number) {
    return this.playlistRepo.delete(id);
  }
}

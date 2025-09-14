import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { In, Repository } from 'typeorm';
import { Music } from 'src/music/entities/music.entity';
import { User } from 'src/users/entities/user.entity';
import { PlaylistType } from 'src/common/playlist-type';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepo: Repository<Playlist>,
    @InjectRepository(Music)
    private readonly musicRepo: Repository<Music>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto, userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const music = await this.musicRepo.findBy({
      id: In(createPlaylistDto.musicId),
    });

    const playlist = this.playlistRepo.create({
      title: createPlaylistDto.title,
      user,
      music,
    });

    return this.playlistRepo.save(playlist);
  }

  async findAll(): Promise<Playlist[]> {
    return this.playlistRepo.find({ relations: ['music', 'user'] });
  }

  async findOne(id: number): Promise<Playlist | null> {
    const playlist = await this.playlistRepo.findOne({
      where: { id },
      relations: ['music', 'user'],
    });
    if (!playlist) throw new NotFoundException('Playlist not found');
    return playlist;
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    const playlist = await this.findOne(id);

    if (!playlist) {
      throw new NotFoundException(`Playlist with id ${id} not found`);
    }

    if (updatePlaylistDto.musicId) {
      playlist.music = await this.musicRepo.findBy({
        id: In(updatePlaylistDto.musicId),
      });
    }

    Object.assign(playlist, updatePlaylistDto);
    return await this.playlistRepo.save(playlist);
  }

  async findByUser(userId: number): Promise<Playlist[]> {
    return this.playlistRepo.find({
      where: { user: { id: userId } },
      relations: ['music', 'user'],
    });
  }

  async filterPlaylists(filters: {
    userId?: number;
    type?: PlaylistType;
    title?: string;
  }): Promise<Playlist[]> {
    const qb = this.playlistRepo
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.user', 'user')
      .leftJoinAndSelect('playlist.music', 'music');

    if (filters.userId) {
      qb.andWhere('user.id = :userId', { userId: filters.userId });
    }

    if (filters.type) {
      qb.andWhere('playlist.type = :type', { type: filters.type });
    }

    if (filters.title) {
      qb.andWhere('playlist.title LIKE :title', {
        title: `%${filters.title}%`,
      });
    }

    qb.orderBy('playlist.createdAt', 'DESC');

    return qb.getMany();
  }
  
  async delete(id: number) {
    const playlist = await this.findOne(id);
    if (!playlist) {
      throw new NotFoundException(`Playlist with id ${id} not found`);
    }
    return this.playlistRepo.delete(playlist.id);
  }
}

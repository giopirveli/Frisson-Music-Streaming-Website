import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { Music } from 'src/music/entities/music.entity';
import { User } from 'src/users/entities/user.entity';

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

  async create(playlist: Partial<Playlist>) {
    return this.playlistRepo.save(this.playlistRepo.create(playlist));
  }

  async findAll() {
    return this.playlistRepo.find({ relations: ['music', 'user'] });
  }

  async findById(id: number) {
    return this.playlistRepo.findOne({
      where: { id },
      relations: ['music', 'user'],
    });
  }

  async findByUser(userId: number) {
    return this.playlistRepo.find({
      where: { user: { id: userId } },
      relations: ['music', 'user'],
    });
  }

  async findMusicByIds(ids: number[]) {
    return this.musicRepo.findBy({ id: In(ids) });
  }

  async update(id: number, data: Partial<Playlist>) {
    await this.playlistRepo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number) {
    return this.playlistRepo.delete(id);
  }

  async findFavoritesByUser(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['likedMusic'],
    });
    return user?.likedMusic || [];
  }

  async findTopCharts(limit = 20) {
    return this.musicRepo
      .createQueryBuilder('music')
      .orderBy('music.listenCount', 'DESC')
      .limit(limit)
      .getMany();
  }

  async findTopHits(limit = 20) {
    return this.musicRepo
      .createQueryBuilder('music')
      .orderBy('music.likeCount', 'DESC')
      .limit(limit)
      .getMany();
  }

  async findRecommendations(userId: number, limit = 20) {
    return this.musicRepo
      .createQueryBuilder('music')
      .leftJoin('music.listeners', 'listeners')
      .where('listeners.userId = :userId', { userId })
      .orderBy('listeners.count', 'DESC')
      .limit(limit)
      .getMany();
  }
}

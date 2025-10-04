import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { Repository } from 'typeorm';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MusicRepository {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepo: Repository<Music>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createMusicDto: CreateMusicDto) {
    const user = await this.userRepo.findOneBy({ id: createMusicDto.userId });
    if (!user) throw new NotFoundException('User not found');

    const music = this.musicRepo.create({ ...createMusicDto, user });
    await this.musicRepo.save(music);
  }

  async findAll(): Promise<Music[]> {
    return await this.musicRepo.find({ relations: ['author', 'user'] });
  }

  async findOne(id: number): Promise<Music | null> {
    return await this.musicRepo.findOne({
      where: { id },
      relations: ['author', 'user'],
    });
  }

  async update(
    id: number,
    updateMusicDto: UpdateMusicDto,
  ): Promise<Music | null> {
    if (updateMusicDto.userId) {
      const user = await this.userRepo.findOneBy({ id: updateMusicDto.userId });
      if (!user) throw new NotFoundException('User not found');
      updateMusicDto['user'] = user;
    }
    await this.musicRepo.update(id, updateMusicDto);
    return await this.musicRepo.findOne({
      where: { id },
      relations: ['author', 'user'],
    });
  }

  async search(query: string): Promise<Music[]> {
    if (!query) return [];
    return this.musicRepo
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.author', 'author')
      .leftJoinAndSelect('music.album', 'album')
      .leftJoinAndSelect('music.user', 'user')
      .where('music.title LIKE :query', { query: `%${query}%` })
      .orWhere('author.name LIKE :query', { query: `%${query}%` })
      .orWhere('album.title LIKE :query', { query: `%${query}%` })
      .getMany();
  }

  async delete(id: number): Promise<void> {
    await this.musicRepo.delete(id);
  }
}

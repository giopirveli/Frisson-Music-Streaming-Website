import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './music.repository';
import { AuthorRepository } from '../author/author.repository';

@Injectable()
export class MusicService {
  constructor(
    private readonly musicRepo: MusicRepository,
    private readonly authorRepo: AuthorRepository,
  ) {}

  async create(createMusicDto: CreateMusicDto) {
    const music = await this.musicRepo.create(createMusicDto);
    return music;
  }

  async findAll() {
    return this.musicRepo.findAll();
  }

  async findOne(id: number) {
    const music = await this.musicRepo.findOne(id);
    if (!music) throw new NotFoundException('Music not found');
    return music;
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    if (updateMusicDto.authorId) {
      const author = await this.authorRepo.findOne(updateMusicDto.authorId);
      if (!author) throw new NotFoundException('Author not found');
    }
    const updated = await this.musicRepo.update(id, updateMusicDto);
    if (!updated) throw new NotFoundException('Music not found');
    return updated;
  }

  async delete(id: number) {
    const music = await this.musicRepo.findOne(id);
    if (!music) throw new NotFoundException('Music not found');
    return this.musicRepo.delete(id);
  }
}

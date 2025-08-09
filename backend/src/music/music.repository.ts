import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { Like, Repository } from 'typeorm';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

@Injectable()
export class MusicRepository {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepo: Repository<Music>,
  ) {}

  async create(dto: CreateMusicDto) {
    const music = this.musicRepo.create(dto);
    return await this.musicRepo.save(music);
  }

  async findAll(): Promise<Music[]> {
    return await this.musicRepo.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Music | null> {
    return await this.musicRepo.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async update(id: number, updateDto: UpdateMusicDto): Promise<Music | null> {
    await this.musicRepo.update(id, updateDto);
    return await this.musicRepo.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.musicRepo.delete(id);
  }

  async search(query: string): Promise<Music[]> {
    return await this.musicRepo.find({
      where: query ? [{ title: Like(`%${query}%`) }] : [],
      relations: ['author'],
    });
  }
}

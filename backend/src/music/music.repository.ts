import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { Like, Repository } from 'typeorm';
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

  async create(dto: CreateMusicDto) {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('User not found');

    const music = this.musicRepo.create({ ...dto, user });
    return await this.musicRepo.save(music);
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

  async update(id: number, updateDto: UpdateMusicDto): Promise<Music | null> {
    if (updateDto.userId) {
      const user = await this.userRepo.findOneBy({ id: updateDto.userId });
      if (!user) throw new NotFoundException('User not found');
      updateDto['user'] = user;
    }
    await this.musicRepo.update(id, updateDto);
    return await this.musicRepo.findOne({
      where: { id },
      relations: ['author', 'user'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.musicRepo.delete(id);
  }

  async search(query: string): Promise<Music[]> {
    return await this.musicRepo.find({
      where: query ? [{ title: Like(`%${query}%`) }] : [],
      relations: ['author', 'user'],
    });
  }
}

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Music } from './entities/music.entity';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepo: Repository<Music>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findMusicOrFail(musicId: number): Promise<Music> {
    const music = await this.musicRepo.findOne({
      where: { id: musicId },
      relations: ['user', 'author', 'album'],
    });
    if (!music) throw new NotFoundException('Music not found');
    return music;
  }

  async findUserOrFail(userId: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(userId: number, createMusicDto: CreateMusicDto): Promise<Music> {
    const user = await this.findUserOrFail(userId);
    const music = this.musicRepo.create({ ...createMusicDto, user });
    return this.musicRepo.save(music);
  }

  async findAll(): Promise<Music[]> {
    return this.musicRepo.find({ relations: ['user', 'author', 'album'] });
  }

  async findByIds(ids: number[]): Promise<Music[]> {
    return this.musicRepo.findBy({ id: In(ids) });
  }

  async findOneMusic(id: number): Promise<Music> {
    return this.findMusicOrFail(id);
  }

  async getUserMusic(userId: number): Promise<Music[]> {
    await this.findUserOrFail(userId);
    return this.musicRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'author', 'album'],
    });
  }

  async updateMusic(
    userId: number,
    musicId: number,
    updateMusicDto: UpdateMusicDto,
  ): Promise<Music> {
    const music = await this.findMusicOrFail(musicId);
    if (music.user.id !== userId)
      throw new ForbiddenException('Cannot edit music of another user');
    Object.assign(music, updateMusicDto);
    return this.musicRepo.save(music);
  }

  async deleteMusic(
    userId: number,
    musicId: number,
  ): Promise<{ message: string }> {
    const music = await this.findMusicOrFail(musicId);
    if (music.user.id !== userId)
      throw new ForbiddenException('Cannot delete music of another user');
    await this.musicRepo.delete(musicId);
    return { message: 'Music deleted successfully' };
  }
}

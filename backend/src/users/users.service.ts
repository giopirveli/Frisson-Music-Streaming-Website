import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateMusicDto } from 'src/music/dto/create-music.dto';
import { UpdateMusicDto } from 'src/music/dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from 'src/music/entities/music.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    @InjectRepository(Music)
    private readonly musicRepo: Repository<Music>,
  ) {}

  async findUser(id: number): Promise<User> {
    const user = await this.usersRepo.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findMusic(musicId: number): Promise<Music> {
    const music = await this.musicRepo.findOne({
      where: { id: musicId },
      relations: ['user', 'author', 'album'],
    });
    if (!music) throw new NotFoundException('Music not found');
    return music;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.findUser(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.usersRepo.update(id, updateUserDto);
    return this.findUser(id);
  }

  async delete(id: number): Promise<void> {
    await this.findUser(id);
    return this.usersRepo.delete(id);
  }

  async addMusic(
    userId: number,
    createMusicDto: CreateMusicDto,
  ): Promise<Music> {
    const user = await this.findUser(userId);
    const music = this.musicRepo.create({ ...createMusicDto, user });
    return this.musicRepo.save(music);
  }

  async getUserMusic(userId: number): Promise<Music[]> {
    await this.findUser(userId);
    return this.musicRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'author', 'album'],
    });
  }

  async getAllMusic(): Promise<Music[]> {
    return this.musicRepo.find({ relations: ['user', 'author', 'album'] });
  }

  async updateMusic(
    userId: number,
    musicId: number,
    updateMusicDto: UpdateMusicDto,
  ): Promise<Music> {
    const music = await this.findMusic(musicId);
    if (music.user.id !== userId)
      throw new ForbiddenException('Cannot edit music of another user');
    Object.assign(music, updateMusicDto);
    return this.musicRepo.save(music);
  }

  async deleteMusic(
    userId: number,
    musicId: number,
  ): Promise<{ message: string }> {
    const music = await this.findMusic(musicId);
    if (music.user.id !== userId)
      throw new ForbiddenException('Cannot delete music of another user');
    await this.musicRepo.delete(musicId);
    return { message: 'Music deleted successfully' };
  }
}

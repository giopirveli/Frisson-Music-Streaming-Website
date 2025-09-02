import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Music } from 'src/music/entities/music.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateMusicDto } from 'src/music/dto/create-music.dto';
import { UpdateMusicDto } from 'src/music/dto/update-music.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Music)
    private readonly musicRepo: Repository<Music>,
  ) {}

  // ----------- Helpers -----------

  private async findUserOrThrowById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  private async findMusic(musicId: number): Promise<Music> {
    const music = await this.musicRepo.findOne({
      where: { id: musicId },
      relations: ['user', 'author', 'album'],
    });
    if (!music) throw new NotFoundException('Music not found');
    return music;
  }

  // ----------- Users -----------

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);

    const token = this.jwtService.sign({
      email: savedUser.email,
      id: savedUser.id,
    });

    const { password, ...result } = savedUser;
    return { user: result, token };
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    return this.findUserOrThrowById(id);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const user = await this.usersRepository.preload({ id, ...updateUserDto });
    if (!user) throw new NotFoundException('User not found');
    return this.usersRepository.save(user);
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }

  // ----------- Music -----------

  async addMusic(
    userId: number,
    createMusicDto: CreateMusicDto,
  ): Promise<Music> {
    const user = await this.findUserOrThrowById(userId);
    const music = this.musicRepo.create({ ...createMusicDto, user });
    return this.musicRepo.save(music);
  }

  async getUserMusic(userId: number): Promise<Music[]> {
    await this.findUserOrThrowById(userId);
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

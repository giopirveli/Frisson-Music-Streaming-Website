import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listener } from './entities/listeners-table.entity';
import { CreateListenersTableDto } from './dto/create-listeners-table.dto';
import { UpdateListenersTableDto } from './dto/update-listeners-table.dto';
import { UsersService } from 'src/users/users.service';
import { MusicService } from 'src/music/music.service';

@Injectable()
export class ListenersTableService {
  constructor(
    @InjectRepository(Listener)
    private listenerRepo: Repository<Listener>,
    private usersService: UsersService,
    private musicService: MusicService,
  ) {}

  async create(dto: CreateListenersTableDto): Promise<Listener> {
    const user = await this.usersService.findOneById(dto.userId);
    if (!user) throw new NotFoundException('User not found');

    const subscriptions = dto.subscriptions?.length
      ? await this.musicService.findByIds(dto.subscriptions)
      : [];

    const listener = this.listenerRepo.create({ user, subscriptions });
    return this.listenerRepo.save(listener);
  }

  async findAll(): Promise<Listener[]> {
    return this.listenerRepo.find({ relations: ['user', 'subscriptions'] });
  }

  async findOne(id: number): Promise<Listener> {
    const listener = await this.listenerRepo.findOne({
      where: { id },
      relations: ['user', 'subscriptions'],
    });
    if (!listener) throw new NotFoundException('Listener not found');
    return listener;
  }

  async update(id: number, dto: UpdateListenersTableDto): Promise<Listener> {
    const listener = await this.findOne(id);

    if (dto.subscriptions?.length) {
      const music = await this.musicService.findByIds(dto.subscriptions);
      listener.subscriptions = music;
    }

    return this.listenerRepo.save(listener);
  }

  async delete(id: number): Promise<{ message: string }> {
    const listener = await this.findOne(id);
    await this.listenerRepo.remove(listener);
    return { message: 'Listener deleted successfully' };
  }
}

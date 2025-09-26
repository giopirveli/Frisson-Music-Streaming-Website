import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listener } from './entities/listeners-table.entity';

@Injectable()
export class ListenersTableRepository {
  constructor(
    @InjectRepository(Listener)
    private readonly listenersRepo: Repository<Listener>,
  ) {}

  async findByUserAndMusic(
    userId: number,
    musicId: number,
  ): Promise<Listener | null> {
    return this.listenersRepo.findOne({
      where: { user: { id: userId }, music: { id: musicId } },
    });
  }

  async createAndSave(listener: Partial<Listener>): Promise<Listener> {
    const newListener = this.listenersRepo.create(listener);
    return this.listenersRepo.save(newListener);
  }

  async save(listener: Listener): Promise<Listener> {
    return this.listenersRepo.save(listener);
  }

  async findUserHistory(userId: number): Promise<Listener[]> {
    return this.listenersRepo.find({
      where: { user: { id: userId } },
      relations: ['music'],
    });
  }
}

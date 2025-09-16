import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListenersTableDto } from './dto/create-listeners-table.dto';
import { UsersService } from 'src/users/users.service';
import { MusicService } from 'src/music/music.service';
import { Listener } from './entities/listeners-table.entity';
import { ListenersTableRepository } from './listeners-table.repository';

@Injectable()
export class ListenersTableService {
  constructor(
    private readonly listenersRepo: ListenersTableRepository,
    private readonly usersService: UsersService,
    private readonly musicService: MusicService,
  ) {}

  async listen(createListenersTableDto: CreateListenersTableDto): Promise<Listener> {
    const user = await this.usersService.findOneById(createListenersTableDto.userId);
    if (!user) throw new NotFoundException('User not found');

    const music = await this.musicService.findMusicOrFail(createListenersTableDto.musicId);
    if (!music) throw new NotFoundException('Music not found');

    let listener = await this.listenersRepo.findByUserAndMusic(
      createListenersTableDto.userId,
      createListenersTableDto.musicId,
    );

    if (listener) {
      listener.playCount += 1;
    } else {
      listener = await this.listenersRepo.createAndSave({
        user,
        music,
        playCount: 1,
      });
    }

    return this.listenersRepo.save(listener);
  }

  async getUserHistory(userId: number): Promise<Listener[]> {
    return this.listenersRepo.findUserHistory(userId);
  }
}

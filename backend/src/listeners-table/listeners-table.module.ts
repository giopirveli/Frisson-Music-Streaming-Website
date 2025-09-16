import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listener } from './entities/listeners-table.entity';
import { ListenersTableService } from './listeners-table.service';
import { ListenersTableRepository } from './listeners-table.repository';
import { UsersModule } from 'src/users/users.module';
import { MusicModule } from 'src/music/music.module';

@Module({
  imports: [TypeOrmModule.forFeature([Listener]), UsersModule, MusicModule],
  providers: [ListenersTableService, ListenersTableRepository],
  exports: [ListenersTableService],
})
export class ListenersTableModule {}

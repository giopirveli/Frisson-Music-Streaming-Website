import { Module } from '@nestjs/common';
import { ListenersTableController } from './listeners-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listener } from './entities/listeners-table.entity';
import { UsersModule } from 'src/users/users.module';
import { MusicModule } from 'src/music/music.module';
import { ListenersTableService } from './listeners-table.service';
import { ListenersTableRepository } from './listeners-table.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Listener]), UsersModule, MusicModule],
  controllers: [ListenersTableController],
  providers: [ListenersTableService, ListenersTableRepository],
})
export class ListenersTableModule {}

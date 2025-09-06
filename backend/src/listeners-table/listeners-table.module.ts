import { Module } from '@nestjs/common';
import { ListenersTableService } from './listeners-table.service';
import { ListenersTableController } from './listeners-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listener } from './entities/listeners-table.entity';
import { UsersModule } from 'src/users/users.module';
import { MusicModule } from 'src/music/music.module';

@Module({
  imports: [TypeOrmModule.forFeature([Listener]), UsersModule, MusicModule],
  controllers: [ListenersTableController],
  providers: [ListenersTableService],
})
export class ListenersTableModule {}

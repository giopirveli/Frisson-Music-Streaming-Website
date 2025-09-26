import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistType } from 'src/common/playlist.enum';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post(':userId')
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPlaylistDto: CreatePlaylistDto,
  ) {
    return this.playlistService.create({ id: userId } as any, createPlaylistDto);
  }

  @Get('dynamic/:userId/:type')
  generate(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('type') type: PlaylistType,
  ) {
    return this.playlistService.generate(userId, type);
  }

  @Get('user/:userId')
  getUserPlaylists(@Param('userId', ParseIntPipe) userId: number) {
    return this.playlistService.getUserPlaylists(userId);
  }

  @Get()
  getAll() {
    return this.playlistService.getAll();
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePlaylistDto: any) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.delete(id);
  }
}

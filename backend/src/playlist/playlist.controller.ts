import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistType } from 'src/common/playlist.enum';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post(':userId')
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPlaylistDto: CreatePlaylistDto,
  ) {
    return this.playlistService.create(userId, createPlaylistDto);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get('filter')
  filter(
    @Query('userId') userId?: number,
    @Query('type') type?: PlaylistType,
    @Query('title') title?: string,
  ) {
    return this.playlistService.filter({ userId, type, title });
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.delete(id);
  }

  @Get('user/:userId')
  getUserPlaylists(@Param('userId', ParseIntPipe) userId: number) {
    return this.playlistService.getUserPlaylists(userId);
  }
}

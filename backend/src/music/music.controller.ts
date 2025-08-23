import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post(':userId')
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createMusicDto: CreateMusicDto,
  ) {
    return this.musicService.create(userId, createMusicDto);
  }

  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.musicService.findOne(id);
  }

  @Get('user/:userId')
  getUserMusic(@Param('userId', ParseIntPipe) userId: number) {
    return this.musicService.getUserMusic(userId);
  }

  @Patch(':userId/:musicId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('musicId', ParseIntPipe) musicId: number,
    @Body() updateMusicDto: UpdateMusicDto,
  ) {
    return this.musicService.update(userId, musicId, updateMusicDto);
  }

  @Delete(':userId/:musicId')
  delete(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('musicId', ParseIntPipe) musicId: number,
  ) {
    return this.musicService.delete(userId, musicId);
  }
}

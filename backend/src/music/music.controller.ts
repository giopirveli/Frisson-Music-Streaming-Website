import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { SearchQueryDto } from 'src/common/query-dto/search-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.musicService.uploadFile(id, file);
  }

  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @Get('search')
  search(@Query() searchQueryDto: SearchQueryDto) {
    return this.musicService.search(searchQueryDto.query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.musicService.findOneMusic(id);
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
    return this.musicService.updateMusic(userId, musicId, updateMusicDto);
  }

  @Delete(':userId/:musicId')
  deleteMusic(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('musicId', ParseIntPipe) musicId: number,
  ) {
    return this.musicService.deleteMusic(userId, musicId);
  }
}

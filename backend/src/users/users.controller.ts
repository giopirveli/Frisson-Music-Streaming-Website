import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateMusicDto } from 'src/music/dto/create-music.dto';
import { UpdateMusicDto } from 'src/music/dto/update-music.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Post(':id/music')
  addMusic(
    @Param('id', ParseIntPipe) id: number,
    @Body() createMusicDto: CreateMusicDto,
  ) {
    return this.usersService.addMusic(id, createMusicDto);
  }

  @Get(':id/music')
  getUserMusic(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserMusic(id);
  }

  @Get('music')
  getAllMusic() {
    return this.usersService.getAllMusic();
  }

  @Patch(':userId/music/:musicId')
  updateMusic(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('musicId', ParseIntPipe) musicId: number,
    @Body() updateMusicDto: UpdateMusicDto,
  ) {
    return this.usersService.updateMusic(userId, musicId, updateMusicDto);
  }

  @Delete(':userId/music/:musicId')
  deleteMusic(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('musicId', ParseIntPipe) musicId: number,
  ) {
    return this.usersService.deleteMusic(userId, musicId);
  }
}

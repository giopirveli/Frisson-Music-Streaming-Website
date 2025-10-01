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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { SearchMusicDto } from 'src/common/search-music.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Post(':id/upload-cover')
  @UseInterceptors(FileInterceptor('file'))
  uploadCover(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.albumsService.uploadCover(id, file);
  }
  
  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get('search')
  search(@Query() searchMusicDto: SearchMusicDto) {
    return this.albumsService.search(searchMusicDto.query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.albumsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.albumsService.delete(id);
  }
}

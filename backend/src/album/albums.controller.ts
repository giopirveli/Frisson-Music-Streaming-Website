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
import { FileInterceptor } from '@nestjs/platform-express';
import { SearchQueryDto } from 'src/common/query-dto/search-query.dto';

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
  search(@Query() searchQueryDto: SearchQueryDto) {
    return this.albumsService.search(searchQueryDto.query);
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

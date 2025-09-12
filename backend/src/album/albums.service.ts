import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './albums.repository';
import { AuthorRepository } from 'src/author/author.repository';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumRepo: AlbumRepository,
    private readonly authorRepo: AuthorRepository,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const author = await this.authorRepo.findOne(createAlbumDto.authorId);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return this.albumRepo.create(createAlbumDto);
  }

  async findAll() {
    return this.albumRepo.findAll();
  }

  async findOne(id: number) {
    const album = await this.albumRepo.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum = await this.albumRepo.update(id, updateAlbumDto);
    if (!updatedAlbum) throw new NotFoundException('Album not found');
    return updatedAlbum;
  }

  async search(query: string) {
    return this.albumRepo.search(query);
  }

  async delete(id: number) {
    const album = await this.albumRepo.findOne(id);
    if (!album) throw new NotFoundException('Album not found');
    return this.albumRepo.delete(id);
  }
}

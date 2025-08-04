import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.albumRepo.create(createAlbumDto);
    return await this.albumRepo.save(album);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepo.find({ relations: ['music', 'author'] });
  }

  async findOne(id: number): Promise<Album | null> {
    return await this.albumRepo.findOne({
      where: { id },
      relations: ['music', 'author'],
    });
  }

  async update(
    id: number,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | null> {
    const album = await this.albumRepo.findOneBy({ id });
    if (!album) return null;
    Object.assign(album, updateAlbumDto);
    return await this.albumRepo.save(album);
  }

  async delete(id: number): Promise<void> {
    await this.albumRepo.delete(id);
  }

  async search(query: string): Promise<Album[]> {
    return await this.albumRepo.find({
      where: { title: Like(`%${query || ''}%`) },
      relations: ['author', 'music'],
    });
  }
}

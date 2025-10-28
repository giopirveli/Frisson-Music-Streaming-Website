import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,
  ) {}

  async create(data: Partial<Album>): Promise<Album> {
    const album = this.albumRepo.create(data);
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

  async search(query: string): Promise<Album[]> {
    const qb = this.albumRepo
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.author', 'author')
      .leftJoinAndSelect('album.music', 'music');
    if (query) {
      qb.where('album.title LIKE :query', { query: `%${query}%` })
        .orWhere('author.name LIKE :query', { query: `%${query}%` })
        .orWhere('music.title LIKE :query', { query: `%${query}%` });
    } else {
      return [];
    }

    return qb.getMany();
  }

  async delete(id: number): Promise<void> {
    await this.albumRepo.delete(id);
  }
}

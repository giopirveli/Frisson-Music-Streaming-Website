import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './albums.repository';
import { AuthorRepository } from 'src/author/author.repository';
import { S3Service } from 'src/common/s3/s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepo: Repository<Album>,
    private readonly albumRepo: AlbumRepository,
    private readonly authorRepo: AuthorRepository,
    private readonly s3Service: S3Service,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const author = await this.authorRepo.findOne(createAlbumDto.authorId);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return this.albumRepo.create(createAlbumDto);
  }

  async uploadCover(
    albumId: number,
    file: Express.Multer.File,
  ): Promise<Album> {
    const album = await this.albumsRepo.findOne({ where: { id: albumId } });
    if (!album) throw new NotFoundException('Album not found');

    const uploaded = await this.s3Service.upload({
      file: file.buffer,
      name: file.originalname,
      mimetype: file.mimetype,
      folder: 'Album',
    });

    album.coverFileName = file.originalname;
    album.coverKey = uploaded.Key;
    album.coverBucket = uploaded.Bucket;
    album.coverUrl = uploaded.Location;

    return this.albumsRepo.save(album);
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

  async delete(id: number): Promise<{ message: string }> {
    const album = await this.albumRepo.findOne(id);
    if (!album) throw new NotFoundException('Album not found');
    await this.albumRepo.delete(id);
    return { message: 'Album successfully deleted' };
  }
}

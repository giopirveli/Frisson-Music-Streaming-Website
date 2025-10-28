import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';
import { S3Service } from 'src/common/s3/s3.service';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepo: Repository<Author>,
    private readonly authorRepo: AuthorRepository,
    private readonly s3Service: S3Service,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return this.authorRepo.create(createAuthorDto);
  }

  async uploadAvatar(
    authorId: number,
    file: Express.Multer.File,
  ): Promise<Author> {
    const author = await this.authorsRepo.findOne({ where: { id: authorId } });
    if (!author) throw new NotFoundException('Author not found');

    const uploaded = await this.s3Service.upload({
      file: file.buffer,
      name: file.originalname,
      mimetype: file.mimetype,
      folder: 'Artist',
    });

    author.artistImage = file.originalname;
    author.artistKey = uploaded.Key;
    author.artistBucket = uploaded.Bucket;
    author.artistUrl = uploaded.Location;

    return this.authorsRepo.save(author);
  }

  async findAll() {
    return this.authorRepo.findAll();
  }

  async findOne(id: number) {
    const author = await this.authorRepo.findOne(id);
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const updated = this.authorRepo.update(id, updateAuthorDto);
    if (!updated) throw new NotFoundException('Author not found');
    return updated;
  }

  async search(query: string) {
    return this.authorRepo.search(query);
  }

  async delete(id: number): Promise<{ message: string }> {
    const author = await this.authorRepo.findOne(id);
    if (!author) throw new NotFoundException('Author not found');
    await this.authorRepo.delete(id);
    return { message: 'Author successfully deleted' };
  }
}

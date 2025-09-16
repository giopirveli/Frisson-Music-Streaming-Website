import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepo: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepo.create(createAuthorDto);
    return await this.authorRepo.save(author);
  }

  async findAll(): Promise<Author[]> {
    return await this.authorRepo.find({ relations: ['music'] });
  }

  async findOne(id: number): Promise<Author | null> {
    return await this.authorRepo.findOne({
      where: { id },
      relations: ['music'],
    });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author | null> {
    await this.authorRepo.update(id, updateAuthorDto);
    return await this.authorRepo.findOneBy({ id });
  }

  async search(query: string): Promise<Author[]> {
    const qb = this.authorRepo
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.music', 'music')
      .leftJoinAndSelect('music.album', 'album');
    if (query) {
      qb.where('author.name LIKE :query', { query: `%${query}%` })
        .orWhere('music.title LIKE :query', { query: `%${query}%` })
        .orWhere('album.title LIKE :query', { query: `%${query}%` });
    } else {
      return [];
    }
    return qb.getMany();
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.authorRepo.delete(id);
    return { message: 'Author successfully deleted' };
  }
}

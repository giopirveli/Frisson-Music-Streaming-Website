import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepo: AuthorRepository) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return this.authorRepo.create(createAuthorDto);
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

  async delete(id: number) {
    const author = await this.authorRepo.findOne(id);
    if (!author) throw new NotFoundException('Author not found');
    return this.authorRepo.delete(id);
  }
}

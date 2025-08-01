import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
export declare class AuthorRepository {
    private readonly authorRepo;
    constructor(authorRepo: Repository<Author>);
    create(dto: CreateAuthorDto): Promise<Author>;
    findAll(): Promise<Author[]>;
    findOne(id: number): Promise<Author | null>;
    update(id: number, updateDto: UpdateAuthorDto): Promise<Author | null>;
    delete(id: number): Promise<void>;
    search(query: string): Promise<Author[]>;
}

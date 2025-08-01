import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';
export declare class AuthorService {
    private readonly authorRepo;
    constructor(authorRepo: AuthorRepository);
    create(createAuthorDto: CreateAuthorDto): Promise<import("./entities/author.entity").Author>;
    findAll(): Promise<import("./entities/author.entity").Author[]>;
    findOne(id: number): Promise<import("./entities/author.entity").Author>;
    update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<import("./entities/author.entity").Author | null>;
    delete(id: number): Promise<void>;
}

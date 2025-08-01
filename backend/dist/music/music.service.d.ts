import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './music.repository';
import { AuthorRepository } from '../author/author.repository';
export declare class MusicService {
    private readonly musicRepo;
    private readonly authorRepo;
    constructor(musicRepo: MusicRepository, authorRepo: AuthorRepository);
    create(createMusicDto: CreateMusicDto): Promise<import("./entities/music.entity").Music | null>;
    findAll(): Promise<import("./entities/music.entity").Music[]>;
    findOne(id: number): Promise<import("./entities/music.entity").Music>;
    update(id: number, updateMusicDto: UpdateMusicDto): Promise<import("./entities/music.entity").Music>;
    delete(id: number): Promise<void>;
}

import { Music } from './entities/music.entity';
import { Repository } from 'typeorm';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
export declare class MusicRepository {
    private readonly musicRepo;
    constructor(musicRepo: Repository<Music>);
    create(dto: CreateMusicDto): Promise<Music>;
    findAll(): Promise<Music[]>;
    findOne(id: number): Promise<Music | null>;
    update(id: number, updateDto: UpdateMusicDto): Promise<Music | null>;
    delete(id: number): Promise<void>;
    search(query: string): Promise<Music[]>;
}

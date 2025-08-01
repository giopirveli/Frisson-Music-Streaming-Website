import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
export declare class MusicController {
    private readonly musicService;
    constructor(musicService: MusicService);
    create(createMusicDto: CreateMusicDto): Promise<import("./entities/music.entity").Music | null>;
    findAll(): Promise<import("./entities/music.entity").Music[]>;
    findOne(id: number): Promise<import("./entities/music.entity").Music>;
    update(id: number, updateMusicDto: UpdateMusicDto): Promise<import("./entities/music.entity").Music>;
    delete(id: number): Promise<void>;
}

import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
export declare class AlbumRepository {
    private readonly albumRepo;
    constructor(albumRepo: Repository<Album>);
    create(createAlbumDto: CreateAlbumDto): Promise<Album>;
    findAll(): Promise<Album[]>;
    findOne(id: number): Promise<Album | null>;
    update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Album | null>;
    delete(id: number): Promise<void>;
    search(query: string): Promise<Album[]>;
}

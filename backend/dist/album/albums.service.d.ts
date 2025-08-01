import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './albums.repository';
import { AuthorRepository } from 'src/author/author.repository';
export declare class AlbumsService {
    private readonly albumRepo;
    private readonly authorRepo;
    constructor(albumRepo: AlbumRepository, authorRepo: AuthorRepository);
    create(createAlbumDto: CreateAlbumDto): Promise<import("./entities/album.entity").Album>;
    findAll(): Promise<import("./entities/album.entity").Album[]>;
    findOne(id: number): Promise<import("./entities/album.entity").Album>;
    update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<import("./entities/album.entity").Album>;
    delete(id: number): Promise<void>;
}

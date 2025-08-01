import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
export declare class AlbumsController {
    private readonly albumsService;
    constructor(albumsService: AlbumsService);
    create(createAlbumDto: CreateAlbumDto): Promise<import("./entities/album.entity").Album>;
    findAll(): Promise<import("./entities/album.entity").Album[]>;
    findOne(id: number): Promise<import("./entities/album.entity").Album>;
    update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<import("./entities/album.entity").Album>;
    delete(id: number): Promise<void>;
}

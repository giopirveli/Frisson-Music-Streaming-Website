"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsService = void 0;
const common_1 = require("@nestjs/common");
const albums_repository_1 = require("./albums.repository");
const author_repository_1 = require("../author/author.repository");
let AlbumsService = class AlbumsService {
    albumRepo;
    authorRepo;
    constructor(albumRepo, authorRepo) {
        this.albumRepo = albumRepo;
        this.authorRepo = authorRepo;
    }
    async create(createAlbumDto) {
        const author = await this.authorRepo.findOne(createAlbumDto.authorId);
        if (!author) {
            throw new common_1.NotFoundException('Author not found');
        }
        return this.albumRepo.create(createAlbumDto);
    }
    async findAll() {
        return this.albumRepo.findAll();
    }
    async findOne(id) {
        const album = await this.albumRepo.findOne(id);
        if (!album) {
            throw new common_1.NotFoundException('Album not found');
        }
        return album;
    }
    async update(id, updateAlbumDto) {
        const updatedAlbum = await this.albumRepo.update(id, updateAlbumDto);
        if (!updatedAlbum)
            throw new common_1.NotFoundException('Album not found');
        return updatedAlbum;
    }
    async delete(id) {
        const album = await this.albumRepo.findOne(id);
        if (!album)
            throw new common_1.NotFoundException('Album not found');
        return this.albumRepo.delete(id);
    }
};
exports.AlbumsService = AlbumsService;
exports.AlbumsService = AlbumsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [albums_repository_1.AlbumRepository,
        author_repository_1.AuthorRepository])
], AlbumsService);
//# sourceMappingURL=albums.service.js.map
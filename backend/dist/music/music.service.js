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
exports.MusicService = void 0;
const common_1 = require("@nestjs/common");
const music_repository_1 = require("./music.repository");
const author_repository_1 = require("../author/author.repository");
let MusicService = class MusicService {
    musicRepo;
    authorRepo;
    constructor(musicRepo, authorRepo) {
        this.musicRepo = musicRepo;
        this.authorRepo = authorRepo;
    }
    async create(createMusicDto) {
        const music = this.musicRepo.create(createMusicDto);
        if (!music)
            return null;
        return music;
    }
    async findAll() {
        return this.musicRepo.findAll();
    }
    async findOne(id) {
        const music = await this.musicRepo.findOne(id);
        if (!music)
            throw new common_1.NotFoundException('Music not found');
        return music;
    }
    async update(id, updateMusicDto) {
        if (updateMusicDto.authorId) {
            const author = await this.authorRepo.findOne(updateMusicDto.authorId);
            if (!author)
                throw new common_1.NotFoundException('Author not found');
        }
        const updated = await this.musicRepo.update(id, updateMusicDto);
        if (!updated)
            throw new common_1.NotFoundException('Music not found');
        return updated;
    }
    async delete(id) {
        const music = await this.musicRepo.findOne(id);
        if (!music)
            throw new common_1.NotFoundException('Music not found');
        return this.musicRepo.delete(id);
    }
};
exports.MusicService = MusicService;
exports.MusicService = MusicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [music_repository_1.MusicRepository,
        author_repository_1.AuthorRepository])
], MusicService);
//# sourceMappingURL=music.service.js.map
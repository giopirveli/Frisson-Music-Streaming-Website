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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const author_repository_1 = require("../author/author.repository");
const music_repository_1 = require("../music/music.repository");
const albums_repository_1 = require("../album/albums.repository");
let SearchService = class SearchService {
    authorRepo;
    musicRepo;
    albumRepo;
    constructor(authorRepo, musicRepo, albumRepo) {
        this.authorRepo = authorRepo;
        this.musicRepo = musicRepo;
        this.albumRepo = albumRepo;
    }
    async search({ query }) {
        return {
            music: await this.musicRepo.search(query || ''),
            authors: await this.authorRepo.search(query || ''),
            albums: await this.albumRepo.search(query || ''),
        };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [author_repository_1.AuthorRepository,
        music_repository_1.MusicRepository,
        albums_repository_1.AlbumRepository])
], SearchService);
//# sourceMappingURL=search.service.js.map
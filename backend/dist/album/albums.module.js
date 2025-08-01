"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsModule = void 0;
const common_1 = require("@nestjs/common");
const albums_service_1 = require("./albums.service");
const albums_controller_1 = require("./albums.controller");
const typeorm_1 = require("@nestjs/typeorm");
const album_entity_1 = require("./entities/album.entity");
const author_module_1 = require("../author/author.module");
const music_module_1 = require("../music/music.module");
const albums_repository_1 = require("./albums.repository");
let AlbumsModule = class AlbumsModule {
};
exports.AlbumsModule = AlbumsModule;
exports.AlbumsModule = AlbumsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([album_entity_1.Album]), author_module_1.AuthorModule, music_module_1.MusicModule],
        controllers: [albums_controller_1.AlbumsController],
        providers: [albums_service_1.AlbumsService, albums_repository_1.AlbumRepository],
        exports: [albums_repository_1.AlbumRepository],
    })
], AlbumsModule);
//# sourceMappingURL=albums.module.js.map
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
exports.Album = void 0;
const author_entity_1 = require("../../author/entities/author.entity");
const music_entity_1 = require("../../music/entities/music.entity");
const typeorm_1 = require("typeorm");
let Album = class Album {
    id;
    title;
    releaseDate;
    artistName;
    author;
    music;
};
exports.Album = Album;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Album.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Album.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Album.prototype, "releaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Album.prototype, "artistName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => author_entity_1.Author, (author) => author.albums, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'authorId' }),
    __metadata("design:type", author_entity_1.Author)
], Album.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => music_entity_1.Music, (music) => music.album),
    __metadata("design:type", Array)
], Album.prototype, "music", void 0);
exports.Album = Album = __decorate([
    (0, typeorm_1.Entity)('albums')
], Album);
//# sourceMappingURL=album.entity.js.map
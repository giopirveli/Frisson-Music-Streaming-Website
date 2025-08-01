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
exports.Music = void 0;
const album_entity_1 = require("../../album/entities/album.entity");
const author_entity_1 = require("../../author/entities/author.entity");
const typeorm_1 = require("typeorm");
let Music = class Music {
    id;
    title;
    url;
    author;
    album;
};
exports.Music = Music;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Music.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Music.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Music.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => author_entity_1.Author, (author) => author.music, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'authorId' }),
    __metadata("design:type", author_entity_1.Author)
], Music.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => album_entity_1.Album, (album) => album.music, { nullable: true }),
    __metadata("design:type", album_entity_1.Album)
], Music.prototype, "album", void 0);
exports.Music = Music = __decorate([
    (0, typeorm_1.Entity)('music')
], Music);
//# sourceMappingURL=music.entity.js.map
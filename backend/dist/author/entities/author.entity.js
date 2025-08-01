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
exports.Author = void 0;
const album_entity_1 = require("../../album/entities/album.entity");
const music_entity_1 = require("../../music/entities/music.entity");
const typeorm_1 = require("typeorm");
let Author = class Author {
    id;
    name;
    url;
    music;
    albums;
};
exports.Author = Author;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Author.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Author.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Author.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => music_entity_1.Music, (music) => music.author),
    __metadata("design:type", Array)
], Author.prototype, "music", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => album_entity_1.Album, (album) => album.author),
    __metadata("design:type", Array)
], Author.prototype, "albums", void 0);
exports.Author = Author = __decorate([
    (0, typeorm_1.Entity)('authors')
], Author);
//# sourceMappingURL=author.entity.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const music_entity_1 = require("./entities/music.entity");
const typeorm_2 = require("typeorm");
let MusicRepository = class MusicRepository {
    musicRepo;
    constructor(musicRepo) {
        this.musicRepo = musicRepo;
    }
    async create(dto) {
        const music = this.musicRepo.create(dto);
        return await this.musicRepo.save(music);
    }
    async findAll() {
        return await this.musicRepo.find({ relations: ['author'] });
    }
    async findOne(id) {
        return await this.musicRepo.findOne({
            where: { id },
            relations: ['author'],
        });
    }
    async update(id, updateDto) {
        await this.musicRepo.update(id, updateDto);
        return await this.musicRepo.findOneBy({ id });
    }
    async delete(id) {
        await this.musicRepo.delete(id);
    }
    async search(query) {
        return await this.musicRepo.find({
            where: query ? [{ title: (0, typeorm_2.Like)(`%${query}%`) }] : [],
            relations: ['author'],
        });
    }
};
exports.MusicRepository = MusicRepository;
exports.MusicRepository = MusicRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(music_entity_1.Music)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MusicRepository);
//# sourceMappingURL=music.repository.js.map
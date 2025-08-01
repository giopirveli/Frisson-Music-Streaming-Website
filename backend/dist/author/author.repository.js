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
exports.AuthorRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const author_entity_1 = require("./entities/author.entity");
const typeorm_2 = require("typeorm");
let AuthorRepository = class AuthorRepository {
    authorRepo;
    constructor(authorRepo) {
        this.authorRepo = authorRepo;
    }
    async create(dto) {
        const author = this.authorRepo.create(dto);
        return await this.authorRepo.save(author);
    }
    async findAll() {
        return await this.authorRepo.find({ relations: ['music'] });
    }
    async findOne(id) {
        return await this.authorRepo.findOne({
            where: { id },
            relations: ['music'],
        });
    }
    async update(id, updateDto) {
        await this.authorRepo.update(id, updateDto);
        return await this.authorRepo.findOneBy({ id });
    }
    async delete(id) {
        await this.authorRepo.delete(id);
    }
    async search(query) {
        return await this.authorRepo.find({
            where: query ? [{ name: (0, typeorm_2.Like)(`%${query}%`) }] : [],
            relations: ['music'],
        });
    }
};
exports.AuthorRepository = AuthorRepository;
exports.AuthorRepository = AuthorRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(author_entity_1.Author)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthorRepository);
//# sourceMappingURL=author.repository.js.map
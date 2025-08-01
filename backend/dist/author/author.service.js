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
exports.AuthorService = void 0;
const common_1 = require("@nestjs/common");
const author_repository_1 = require("./author.repository");
let AuthorService = class AuthorService {
    authorRepo;
    constructor(authorRepo) {
        this.authorRepo = authorRepo;
    }
    async create(createAuthorDto) {
        return this.authorRepo.create(createAuthorDto);
    }
    async findAll() {
        return this.authorRepo.findAll();
    }
    async findOne(id) {
        const author = await this.authorRepo.findOne(id);
        if (!author)
            throw new common_1.NotFoundException('Author not found');
        return author;
    }
    async update(id, updateAuthorDto) {
        const updated = this.authorRepo.update(id, updateAuthorDto);
        if (!updated)
            throw new common_1.NotFoundException('Author not found');
        return updated;
    }
    async delete(id) {
        const author = await this.authorRepo.findOne(id);
        if (!author)
            throw new common_1.NotFoundException('Author not found');
        return this.authorRepo.delete(id);
    }
};
exports.AuthorService = AuthorService;
exports.AuthorService = AuthorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [author_repository_1.AuthorRepository])
], AuthorService);
//# sourceMappingURL=author.service.js.map
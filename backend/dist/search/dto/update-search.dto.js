"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSearchDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const search_music_dto_1 = require("./search-music.dto");
class UpdateSearchDto extends (0, mapped_types_1.PartialType)(search_music_dto_1.SearchMusicDto) {
}
exports.UpdateSearchDto = UpdateSearchDto;
//# sourceMappingURL=update-search.dto.js.map
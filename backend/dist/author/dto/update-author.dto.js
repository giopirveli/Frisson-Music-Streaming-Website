"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_author_dto_1 = require("./create-author.dto");
class UpdateAuthorDto extends (0, mapped_types_1.PartialType)(create_author_dto_1.CreateAuthorDto) {
}
exports.UpdateAuthorDto = UpdateAuthorDto;
//# sourceMappingURL=update-author.dto.js.map
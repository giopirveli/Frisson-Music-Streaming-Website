import { PartialType } from '@nestjs/mapped-types';
import { SearchMusicDto } from './search-music.dto';

export class UpdateSearchDto extends PartialType(SearchMusicDto) {}

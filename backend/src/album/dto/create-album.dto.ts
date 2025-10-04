import { IsInt, IsOptional, IsString } from 'class-validator';
import { SearchQueryDto } from 'src/common/query-dto/search-query.dto';

export class CreateAlbumDto extends SearchQueryDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  releaseDate?: string;

  @IsString()
  artistName: string;

  @IsInt()
  authorId: number;
}

import { IsOptional, IsString } from 'class-validator';

export class SearchMusicDto {
  @IsString()
  @IsOptional()
  query?: string;
}

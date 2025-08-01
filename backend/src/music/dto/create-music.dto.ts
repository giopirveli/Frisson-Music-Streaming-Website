import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  title: string;

  @IsUrl()
  url: string;

  @IsOptional()
  albumId?: number;

  @IsInt()
  authorId: number;

  @IsString()
  @IsOptional()
  artistName?: string;
}

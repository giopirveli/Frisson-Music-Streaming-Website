import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
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

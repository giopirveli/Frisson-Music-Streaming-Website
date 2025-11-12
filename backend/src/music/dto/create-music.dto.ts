import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  url: string;

  @IsInt()
  albumId?: number;

  @IsInt()
  authorId?: number;

  @IsInt()
  userId?: number;

  @IsString()
  @IsOptional()
  artistName: string;

  @IsString()
  image: string;
}

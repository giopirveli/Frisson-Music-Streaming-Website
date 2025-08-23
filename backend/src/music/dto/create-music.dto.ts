import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  url: string;

  @IsNumber()
  albumId: number;

  @IsInt()
  authorId: number;

  @IsString()
  @IsOptional()
  artistName: string;

  @IsString()
  image: string;

  @IsNumber()
  userId: number;
}

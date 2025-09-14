import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PlaylistType } from 'src/common/playlist-type';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  musicId: number[];

  @IsOptional()
  type?: PlaylistType;
}

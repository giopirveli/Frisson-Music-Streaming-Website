import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { PlaylistType } from 'src/playlist/playlist.enum';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt({ each: true })
  musicId: number[];

  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsEnum(PlaylistType)
  type?: PlaylistType;
}

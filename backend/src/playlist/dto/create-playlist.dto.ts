import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PlaylistType } from 'src/common/playlist.enum';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt({ each: true })
  musicId: number[];

  @IsOptional()
  @IsEnum(PlaylistType)
  type?: PlaylistType;
}

import { IsNumber } from 'class-validator';

export class CreateListenersTableDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  musicId: number;
}

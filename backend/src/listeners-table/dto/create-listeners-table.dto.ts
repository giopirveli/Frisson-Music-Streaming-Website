import { IsNumber, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateListenersTableDto {
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  subscriptions?: number[];
}

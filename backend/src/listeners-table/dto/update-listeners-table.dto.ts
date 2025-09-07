import { PartialType } from '@nestjs/swagger';
import { CreateListenersTableDto } from './create-listeners-table.dto';

export class UpdateListenersTableDto extends PartialType(
  CreateListenersTableDto,
) {}

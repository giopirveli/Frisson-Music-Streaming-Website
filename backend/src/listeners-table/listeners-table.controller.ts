import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ListenersTableService } from './listeners-table.service';
import { CreateListenersTableDto } from './dto/create-listeners-table.dto';

@Controller('listeners')
export class ListenersTableController {
  constructor(private readonly listenersService: ListenersTableService) {}

  @Post()
  listen(@Body() createListenersTable: CreateListenersTableDto) {
    return this.listenersService.listen(createListenersTable);
  }

  @Get('user/:id')
  getUserHistory(@Param('id', ParseIntPipe) id: number) {
    return this.listenersService.getUserHistory(id);
  }
}

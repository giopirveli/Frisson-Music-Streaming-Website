import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ListenersTableService } from './listeners-table.service';
import { CreateListenersTableDto } from './dto/create-listeners-table.dto';
import { UpdateListenersTableDto } from './dto/update-listeners-table.dto';

@Controller('listeners')
export class ListenersTableController {
  constructor(private readonly listenersTableService: ListenersTableService) {}

  @Post()
  create(@Body() createListenersTableDto: CreateListenersTableDto) {
    return this.listenersTableService.create(createListenersTableDto);
  }

  @Get()
  findAll() {
    return this.listenersTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.listenersTableService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateListenersTableDto: UpdateListenersTableDto,
  ) {
    return this.listenersTableService.update(id, updateListenersTableDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.listenersTableService.delete(id);
  }
}

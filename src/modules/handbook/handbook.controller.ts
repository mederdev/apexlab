import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { HandbookService } from './handbook.service';
import { CreateHandbookDto } from './dto/create-handbook.dto';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { TypeSearchQuery } from './dto/type-search.query';
import { UpdateHandbookDto } from './dto/update-handbook.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HandbookEnum } from '../../common/enums/handbook.enum';

@ApiTags('Справочник')
@Controller('handbook')
export class HandbookController {
  constructor(
    private readonly handbookService: HandbookService
  ) {}

  @ApiOperation({ summary: 'Получить данные из справочника' })
  @Get()
  getAll(@Query() listParams: ListParamsDto, @Query() searchParams: TypeSearchQuery) {
    return this.handbookService.getAll(listParams, searchParams);
  }

  @ApiOperation({ summary: 'Создать справочник', description: `Справочники делятся по типу на: ${Object.values(HandbookEnum)}` })
  @Post()
  createHB(@Body() payload: CreateHandbookDto) {
    return this.handbookService.create(payload);
  }

  @ApiOperation({ summary: 'Изменить справочник' })
  @Patch(':id')
  updateHB(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateHandbookDto) {
    return this.handbookService.update(id, payload);
  }

  @ApiOperation({ summary: 'Удалить справочник' })
  @Delete(':id')
  deleteHB(@Param('id', ParseIntPipe) id: number) {
    return this.handbookService.delete(id);
  }
}

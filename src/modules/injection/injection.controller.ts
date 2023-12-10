import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { InjectionService } from './injection.service';
import { CreateInjectionDto } from './dto/create-injection.dto';
import { UpdateInjectionDto } from './dto/update-injection.dto';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { InjectionSearchQuery } from './dto/injection-search.query';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectionEnum } from '../../common/enums/injection.enum';

@ApiTags('Инъекции')
@Controller('injection')
export class InjectionController {
  constructor(private readonly injectionService: InjectionService) {}

  @ApiOperation({ summary: 'Создать инъекцию', description: `Инъекции делятся по типу на: ${Object.values(InjectionEnum)}` })
  @Post()
  createNeedle(@Body() payload: CreateInjectionDto) {
    return this.injectionService.createInjection(payload)
  }

  @ApiOperation({ summary: 'Получить список инъекции' })
  @Get()
  findAllNeedle(@Query() listParams: ListParamsDto, @Query() searchParams: InjectionSearchQuery) {
    return this.injectionService.getInjections(listParams, searchParams);
  }

  @ApiOperation({ summary: 'Получить инъекцию по айди' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.injectionService.findOne(id);
  }

  @ApiOperation({ summary: 'Изменить инъекцию' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateNeedleDto: UpdateInjectionDto) {
    return this.injectionService.update(id, updateNeedleDto);
  }

  @ApiOperation({ summary: 'Удаление по айди' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.injectionService.remove(+id);
  }
}

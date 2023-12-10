import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { CreateHemodialysisSessionDto } from './dto/create-hemodialysis-session.dto';
import { CreateAfterSessionDto } from './dto/create-after-session.dto';
import { CreateHomeTreatmentDto } from './dto/create-home-treatment.dto';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Записи')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @ApiOperation({
    summary: 'Создать сеанс',
    description: `Метод принимает айди сеансов и создаст конечный сеанс гемодиализа`,
  })
  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }

  @ApiOperation({ summary: 'Создать назначения сеанса гемодиализа' })
  @Post('hemodialysis')
  createH(@Body() payload: CreateHemodialysisSessionDto) {
    return this.recordsService.createH(payload);
  }

  @ApiOperation({ summary: 'Создать назначения после сеанса' })
  @Post('after-session')
  createAS(@Body() payload: CreateAfterSessionDto) {
    return this.recordsService.createAS(payload);
  }

  @ApiOperation({ summary: 'Создать лечение на дому' })
  @Post('home-treatment')
  createHT(@Body() payload: CreateHomeTreatmentDto) {
    return this.recordsService.createHT(payload);
  }

  @ApiOperation({ summary: 'Получить список сеансов' })
  @Get()
  findAll(@Query() listParams: ListParamsDto) {
    return this.recordsService.findAll(listParams);
  }

  @ApiOperation({ summary: 'Получить сеанс по айди' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recordsService.findOne(id);
  }

  @ApiOperation({ summary: 'Изменить сеанс' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecordDto: UpdateRecordDto,
  ) {
    return this.recordsService.update(id, updateRecordDto);
  }

  @ApiOperation({ summary: 'Удалить сеанс' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recordsService.remove(id);
  }
}

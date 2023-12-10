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
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { MedicineSearchQuery } from './dto/medicine-search.query';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Лекарства')
@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @ApiOperation({ summary: 'Создать лекарство' })
  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  }

  @ApiOperation({ summary: 'Получить список лекарств' })
  @Get()
  findAll(
    @Query() listParams: ListParamsDto,
    @Query() searchParams: MedicineSearchQuery,
  ) {
    return this.medicineService.getMedicines(listParams, searchParams);
  }

  @ApiOperation({ summary: 'Получить лекарство по айди' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicineService.findOne(id);
  }

  @ApiOperation({ summary: 'Изменить лекарство по айди' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicineService.update(id, updateMedicineDto);
  }

  @ApiOperation({ summary: 'Удалить лекарство' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicineService.remove(id);
  }
}

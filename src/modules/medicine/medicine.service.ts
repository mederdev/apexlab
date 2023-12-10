import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { queryGenerator } from '../../common/utils/query-generator';
import { Medicine } from '../../entities/medicine.entity';
import { MedicineSearchQuery } from './dto/medicine-search.query';
import { MessagesEnum } from '../../common/enums/messages.enum';

@Injectable()
export class MedicineService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Medicine)
    private readonly medicineRepository: EntityRepository<Medicine>,
  ) {}

  async create(createMedicineDto: CreateMedicineDto) {
    const medicine = this.medicineRepository.create(createMedicineDto);

    await this.em.persist(medicine).flush();

    return {
      message: MessagesEnum.CREATED,
    };
  }

  async getMedicines(
    listParams: ListParamsDto,
    searchParams: MedicineSearchQuery,
  ) {
    const whereQuery = queryGenerator(searchParams, 'name');

    const data = await this.medicineRepository.find(whereQuery, {
      limit: listParams.limit,
      offset: listParams.countOffset(),
    });

    if (!data.length) throw new NotFoundException(MessagesEnum.NOT_FOUND);

    const count = await this.medicineRepository.count(whereQuery);

    return {
      count,
      data,
    };
  }
  async findOne(id: number) {
    const medicine = await this.medicineRepository.findOne({ id });

    if (!medicine) throw new NotFoundException(MessagesEnum.NOT_FOUND);

    return medicine;
  }

  async update(id: number, payload: UpdateMedicineDto) {
    const handbook = await this.medicineRepository.findOne({ id });

    if (!handbook) throw new NotFoundException(MessagesEnum.NOT_FOUND);

    this.em.assign(handbook, payload);
    await this.em.flush();

    return {
      message: MessagesEnum.UPDATED,
    };
  }

  async remove(id: number) {
    const handbook = await this.medicineRepository.findOne({ id });

    if (!handbook) throw new NotFoundException(MessagesEnum.NOT_FOUND);

    await this.em.removeAndFlush(handbook);

    return {
      message: MessagesEnum.DELETED,
    };
  }
}

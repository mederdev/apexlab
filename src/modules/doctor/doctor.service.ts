import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Doctor } from '../../entities/doctor.entity';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { MessagesEnum } from '../../common/enums/messages.enum';

@Injectable()
export class DoctorService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Doctor)
    private readonly doctorRepository: EntityRepository<Doctor>
  ) {}

  async create(createMedicineDto: CreateDoctorDto) {
    const doctor = this.doctorRepository.create(createMedicineDto)

    await this.em.persist(doctor).flush()

    return {
      message: MessagesEnum.CREATED
    }
  }
  async findAll(listParams: ListParamsDto) {
    const data = await this.doctorRepository.findAll({
      limit: listParams.limit,
      offset: listParams.countOffset()
    })

    if (!data.length) throw new NotFoundException(MessagesEnum.NOT_FOUND)

    const count = await this.doctorRepository.count()

    return {
      count,
      data
    };
  }
  async findOne(id: number) {
    const doctor = await this.doctorRepository.findOne({ id })

    if (!doctor) throw new NotFoundException(MessagesEnum.NOT_FOUND)

    return doctor
  }
  async update(id: number, payload: UpdateDoctorDto) {
    const doctor = await this.doctorRepository.findOne({ id })

    if (!doctor) throw new NotFoundException(MessagesEnum.NOT_FOUND)

    this.em.assign(doctor, payload)
    await this.em.flush()

    return {
      message: MessagesEnum.UPDATED
    };
  }
  async remove(id: number) {
    const doctor = await this.doctorRepository.findOne({ id })

    if (!doctor) throw new NotFoundException(MessagesEnum.NOT_FOUND)

    await this.em.removeAndFlush(doctor)

    return {
      message: MessagesEnum.DELETED
    };
  }
}

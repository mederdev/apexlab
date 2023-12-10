import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { CreateHemodialysisSessionDto } from './dto/create-hemodialysis-session.dto';
import { CreateAfterSessionDto } from './dto/create-after-session.dto';
import { CreateHomeTreatmentDto } from './dto/create-home-treatment.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HemodialysisSession } from '../../entities/hemodialysisSession.entity';
import { InjectionService } from '../injection/injection.service';
import { AfterSession } from '../../entities/afterSession.entity';
import { HomeTreatment } from '../../entities/homeTreatment.entity';
import { Record } from '../../entities/record.entity';
import { MedicineService } from '../medicine/medicine.service';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { MessagesEnum } from '../../common/enums/messages.enum';

@Injectable()
export class RecordsService {
  constructor(
    private readonly injectionService: InjectionService,
    private readonly medicineService: MedicineService,
    private readonly em: EntityManager,
    @InjectRepository(Record)
    private readonly recordRepository: EntityRepository<Record>,
    @InjectRepository(HemodialysisSession)
    private readonly hemodialysisRepository: EntityRepository<HemodialysisSession>,
    @InjectRepository(AfterSession)
    private readonly afterSessionRepository: EntityRepository<AfterSession>,
    @InjectRepository(HomeTreatment)
    private readonly homeTreatmentRepository: EntityRepository<HomeTreatment>,
  ) {}
  async create(createRecordDto: CreateRecordDto) {
    const ifExist = await this.recordRepository.findOne({
      hemodialysisSessionsId: createRecordDto.hemodialysisSessionsId,
    });

    if (ifExist)
      throw new BadRequestException(
        `Record for hemodialysis session with id ${createRecordDto.hemodialysisSessionsId} already exist!`,
      );

    const record = this.recordRepository.create(createRecordDto);

    const afterSessions = await this.afterSessionRepository.find({
      id: createRecordDto.afterSessions,
    });
    if (afterSessions.length !== createRecordDto.afterSessions.length)
      throw new ConflictException('Some after session id is invalid!');
    record.afterSessions = afterSessions;

    const homeTreatments = await this.homeTreatmentRepository.find({
      id: createRecordDto.homeTreatments,
    });
    if (homeTreatments.length !== createRecordDto.homeTreatments.length)
      throw new ConflictException('Some home treatment id is invalid!');
    record.homeTreatments = homeTreatments;

    await this.em.persist(record).flush();

    return {
      message: MessagesEnum.CREATED,
    };
  }

  async createH(payload: CreateHemodialysisSessionDto) {
    const hemodialysisSession = this.hemodialysisRepository.create(payload);

    await this.em.persist(hemodialysisSession).flush();

    return {
      message: MessagesEnum.CREATED,
    };
  }
  async createAS(payload: CreateAfterSessionDto) {
    const medicine = await this.medicineService.findOne(payload.medicinesId);

    if (!medicine) throw new NotFoundException('Medicine not found!');

    const hemodialysisSession = this.afterSessionRepository.create(payload);

    await this.em.persist(hemodialysisSession).flush();

    return {
      message: MessagesEnum.CREATED,
    };
  }
  async createHT(payload: CreateHomeTreatmentDto) {
    const medicine = await this.medicineService.findOne(payload.medicinesId);

    if (!medicine) throw new NotFoundException('Medicine not found!');

    const hemodialysisSession = this.homeTreatmentRepository.create(payload);

    await this.em.persist(hemodialysisSession).flush();

    return {
      message: MessagesEnum.CREATED,
    };
  }

  async findAll(listParams: ListParamsDto) {
    const data = await this.recordRepository.findAll({
      limit: listParams.limit,
      offset: listParams.countOffset(),
      populate: [
        'afterSessions',
        'homeTreatments',
        'doctor',
        'afterSessions.medicine',
        'homeTreatments.medicine',
      ],
    });

    const count = await this.recordRepository.count();

    return {
      count,
      data,
    };
  }

  async findOne(id: number) {
    const record = await this.recordRepository.findOne(
      {
        id,
      },
      {
        populate: [
          'afterSessions',
          'homeTreatments',
          'doctor',
          'afterSessions.medicine',
          'homeTreatments.medicine',
        ],
      },
    );

    if (!record) throw new NotFoundException(MessagesEnum.NOT_FOUND);

    return record;
  }

  async update(id: number, payload: UpdateRecordDto) {
    const record = await this.recordRepository.findOne({ id });

    if (!record) throw new NotFoundException(MessagesEnum.NOT_FOUND);

    const afterSessions = await this.afterSessionRepository.find({
      id: payload.afterSessions,
    });
    if (afterSessions.length !== payload.afterSessions.length)
      throw new ConflictException('Some after session id is invalid!');

    const homeTreatments = await this.homeTreatmentRepository.find({
      id: payload.homeTreatments,
    });
    if (homeTreatments.length !== payload.homeTreatments.length)
      throw new ConflictException('Some home treatment id is invalid!');

    this.em.assign(record, {
      ...payload,
      afterSessions,
      homeTreatments,
    });
    await this.em.flush();

    return {
      message: MessagesEnum.UPDATED,
    };
  }

  async remove(id: number) {
    const record = await this.recordRepository.findOne({ id });

    if (!record) throw new NotFoundException(MessagesEnum.NOT_FOUND);

    await this.em.removeAndFlush(record);

    return {
      message: MessagesEnum.DELETED,
    };
  }
}

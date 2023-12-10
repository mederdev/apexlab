import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { queryGenerator } from '../../common/utils/query-generator';
import { UpdateInjectionDto } from './dto/update-injection.dto';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { InjectionSearchQuery } from './dto/injection-search.query';
import { Injection } from '../../entities/injection.entity';
import { MessagesEnum } from '../../common/enums/messages.enum';

@Injectable()
export class InjectionService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Injection)
    private readonly injectionService: EntityRepository<Injection>,
  ) {}

  async getInjections(listParams: ListParamsDto, searchParams: InjectionSearchQuery) {
    const whereQuery = queryGenerator(searchParams, 'type')

    const injections = await this.injectionService.find(whereQuery, {
      limit: listParams.limit,
      offset: listParams.countOffset(),
    })

    if (!injections.length) throw new NotFoundException(MessagesEnum.NOT_FOUND)

    const itemsCount = await this.injectionService.count(whereQuery)

    return {
      count: itemsCount,
      data: injections
    }
  }
  async createInjection(payload) {
    const injection = this.injectionService.create(payload)

    await this.em.persist(injection).flush()

    return {
      message: MessagesEnum.CREATED
    }
  }
  async findOne(id: number) {
    const injection = await this.injectionService.findOne({ id });

    if (!injection) throw new NotFoundException(MessagesEnum.NOT_FOUND);

    return injection
  }
  async update(id: number, payload: UpdateInjectionDto) {
    const injection = await this.injectionService.findOne({ id })

    if (!injection) throw new NotFoundException(MessagesEnum.NOT_FOUND)

    this.em.assign(injection, payload)
    await this.em.flush()

    return {
      message: MessagesEnum.UPDATED
    };
  }
  async remove(id: number) {
    const injection = await this.injectionService.findOne({ id })

    if (!injection) throw new NotFoundException(MessagesEnum.NOT_FOUND)

    await this.em.removeAndFlush(injection)

    return {
      message: MessagesEnum.DELETED
    };
  }
}

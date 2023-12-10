import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Handbook } from '../../entities/handbook.entity';
import { CreateHandbookDto } from './dto/create-handbook.dto';
import { ListParamsDto } from '../../common/dto/list-params.dto';
import { TypeSearchQuery } from './dto/type-search.query';
import { queryGenerator } from '../../common/utils/query-generator';
import { UpdateHandbookDto } from './dto/update-handbook.dto';
import { MessagesEnum } from '../../common/enums/messages.enum';

@Injectable()
export class HandbookService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Handbook)
    private readonly handbookRepository: EntityRepository<Handbook>
  ) {}

  async create(payload: CreateHandbookDto) {
    const handbook = this.handbookRepository.create(payload);

    await this.em.persist(handbook).flush()

    return {
      message: MessagesEnum.CREATED
    }
  }

  async getAll(listParams: ListParamsDto, searchParams: TypeSearchQuery) {
    const whereQuery = queryGenerator(searchParams, 'type', 'eq')

    const data = await this.handbookRepository.find(whereQuery,{
      limit: listParams.limit,
      offset: listParams.countOffset()
    })

    if (!data.length) throw new NotFoundException(MessagesEnum.NOT_FOUND)

    const count = await this.handbookRepository.count(whereQuery)

    return {
      count,
      data
    }
  }

  async update(id: number, payload: UpdateHandbookDto) {
    const handbook = await this.handbookRepository.findOne({ id })

    if (!handbook) throw new NotFoundException(MessagesEnum.NOT_FOUND)

    this.em.assign(handbook, payload)
    await this.em.flush()

    return {
      message: MessagesEnum.UPDATED
    };
  }

  async delete(id: number) {
    const handbook = await this.handbookRepository.findOne({ id })

    if (!handbook) throw new NotFoundException(MessagesEnum.NOT_FOUND)

    await this.em.removeAndFlush(handbook)

    return {
      message: MessagesEnum.DELETED
    };
  }
}

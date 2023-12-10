import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base/base.entity';
import { HandbookEnum } from '../common/enums/handbook.enum';

@Entity({
  tableName: 'handbooks',
})
export class Handbook extends BaseEntity {
  @Property({
    type: 'string',
  })
  name: string;

  @Property({
    type: 'string',
  })
  description: string;

  @Property({
    type: () => HandbookEnum,
  })
  type: HandbookEnum;
}

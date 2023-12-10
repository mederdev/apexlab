import { PrimaryKey, Property } from '@mikro-orm/core';

export class BaseEntity {
  @PrimaryKey({
    autoincrement: true,
  })
  id: number;

  @Property({
    type: 'date',
    default: 'NOW()',
  })
  createdAt: Date;

  @Property({
    type: 'date',
    default: 'NOW()',
  })
  updatedAt: Date;
}

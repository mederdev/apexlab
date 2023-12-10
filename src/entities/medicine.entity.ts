import { Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './base/base.entity';
import { HomeTreatment } from './homeTreatment.entity';
import { AfterSession } from './afterSession.entity';

@Entity({
  tableName: 'medicines',
})
export class Medicine extends BaseEntity {
  @Property({
    type: 'string',
  })
  name: string;

  @Property({
    type: 'string',
  })
  manufacturer: string;

  @Property({
    type: 'string',
  })
  description: string;

  @OneToMany(() => HomeTreatment, (homeTreatment) => homeTreatment.medicine, {
    nullable: true,
  })
  homeTreatment: HomeTreatment;

  @OneToMany(() => AfterSession, (afterSession) => afterSession.medicine, {
    nullable: true,
  })
  afterSession: AfterSession;
}

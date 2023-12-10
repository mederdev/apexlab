import { Entity, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import {BaseEntity} from "./base/base.entity";
import { Record } from './record.entity';

@Entity({
  tableName: 'doctors'
})
export class Doctor extends BaseEntity {
  @Property({
    type: 'string'
  })
  name: string

  @Property({
    type: 'numeric'
  })
  age: number

  @Property({
    type: 'string'
  })
  specialization: string

  @OneToMany(() => Record, record => record.doctor)
  records: Record[]
}

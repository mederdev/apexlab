import { Entity, ManyToOne, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import {BaseEntity} from "./base/base.entity";
import { Medicine } from './medicine.entity';
import { Record } from './record.entity';
import { HomeTreatment } from './homeTreatment.entity';

@Entity({
  tableName: 'after_sessions'
})
export class AfterSession extends BaseEntity {
  @ManyToOne(() => Medicine, {
    joinColumn: 'medicines_id',
    nullable: true
  })
  medicine: Medicine;

  @Property({
    name: 'medicines_id',
    type: 'integer',
    nullable: true
  })
  medicinesId: number;

  @Property({
    type: 'string',
    name: 'reception_path'
  })
  receptionPath: string;

  @Property({
    type: 'string'
  })
  dosage: string;

  @Property({
    name: 'session_number',
    type: 'array',
    default: []
  })
  sessionNumbers: number[]

  @Property({
    type: 'date'
  })
  start: Date

  @Property({
    type: 'date'
  })
  end: Date;

  @ManyToOne(() => Record, {
    nullable: true,
    onDelete: 'cascade'
  })
  record: Record;
}

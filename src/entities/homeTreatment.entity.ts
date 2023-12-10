import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './base/base.entity';
import { Medicine } from './medicine.entity';
import { Record } from './record.entity';

@Entity({
  tableName: 'home_treatments',
})
export class HomeTreatment extends BaseEntity {
  @ManyToOne(() => Medicine, {
    joinColumn: 'medicines_id',
    nullable: true,
  })
  medicine: Medicine;

  @Property({
    name: 'medicines_id',
    type: 'integer',
    nullable: true,
  })
  medicinesId: number;

  @Property({
    type: 'string',
    name: 'reception_path',
  })
  receptionPath: string;

  @Property({
    type: 'string',
  })
  dosage: string;

  @Property({
    type: 'string',
  })
  frequency: string;

  @Property({
    type: 'date',
  })
  start: Date;

  @Property({
    type: 'date',
  })
  end: Date;

  @ManyToOne(() => Record, {
    nullable: true,
    onDelete: 'cascade',
  })
  record: Record;
}

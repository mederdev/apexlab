import {
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './base/base.entity';
import { HemodialysisSession } from './hemodialysisSession.entity';
import { AfterSession } from './afterSession.entity';
import { HomeTreatment } from './homeTreatment.entity';
import { Doctor } from './doctor.entity';
@Entity({
  tableName: 'records',
})
export class Record extends BaseEntity {
  @OneToOne(() => HemodialysisSession, {
    nullable: true,
    joinColumn: 'hemodialysis_sessions_id',
  })
  hemodialysisSession: HemodialysisSession;

  @Property({
    name: 'hemodialysis_sessions_id',
  })
  hemodialysisSessionsId: number;

  @OneToMany(() => AfterSession, (afterSession) => afterSession.record)
  afterSessions: AfterSession[];

  @OneToMany(() => HomeTreatment, (homeTreatment) => homeTreatment.record)
  homeTreatments: HomeTreatment[];

  @ManyToOne(() => Doctor, {
    nullable: true,
  })
  doctor: Doctor;

  @Property({
    name: 'doctor_id',
    type: 'integer',
  })
  doctorId: number;

  @Property({
    type: 'array',
  })
  recommendations: string[];

  @Property({
    type: 'date',
  })
  date: Date;
}

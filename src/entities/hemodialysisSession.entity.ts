import { Entity, ManyToOne, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import {BaseEntity} from "./base/base.entity";
import { Injection } from './injection.entity';
import { Record } from './record.entity';
import { InjectionEnum } from '../common/enums/injection.enum';

@Entity({
  tableName: 'hemodialysis_sessions'
})
export class HemodialysisSession extends BaseEntity {
  @Property({
    name: 'program_apparatus'
  })
  programApparatus: string;

  @Property({
    type: 'string'
  })
  dialyzer: string;

  @Property({
    type: 'string'
  })
  concentrator: string;

  @Property({
    type: 'numeric',
    name: 'concentrator_volume'
  })
  concentratorVolume: number;

  @Property({
    name: 'injection_type',
    type: 'string'
  })
  injectionType: InjectionEnum;

  @ManyToOne(() => Injection, {
    nullable: true
  })
  injection: Injection

  @Property({
    type: 'integer',
    name: 'injection_id',
    nullable: true
  })
  injectionId: number;

  @Property({
    type: 'string'
  })
  bicarbonate: string;

  @Property({
    type: 'numeric',
    name: 'patient_weight'
  })
  patientWeight: number

  @Property({
    type: 'string'
  })
  anticoagulation: string

  @Property({
    type: 'numeric',
    name: 'anticoagulation_volume'
  })
  anticoagulationVolume: number

  @OneToOne(() => Record, record => record.hemodialysisSession)
  record!: Record;
}

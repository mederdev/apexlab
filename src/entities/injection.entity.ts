import { Entity, ManyToOne, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import {BaseEntity} from "./base/base.entity";
import {InjectionTypesEnum} from "../common/enums/injection-types.enum";
import { HemodialysisSession } from './hemodialysisSession.entity';
import { HomeTreatment } from './homeTreatment.entity';
import { AfterSession } from './afterSession.entity';
import { InjectionEnum } from '../common/enums/injection.enum';

@Entity({
  tableName: 'injections'
})
export class Injection extends BaseEntity {
  @Property({
    type: "string"
  })
  name: string;

  @Property({
    type: 'numeric'
  })
  size: number;

  @Property({
    type: () => InjectionTypesEnum
  })
  injectionType: InjectionTypesEnum;

  @Property({
    type: 'string'
  })
  type: InjectionEnum;

  @OneToMany(() => HemodialysisSession, hemodialysisSession => hemodialysisSession.injection, {
    nullable: true
  })
  hemodialysisSession: HemodialysisSession;
}

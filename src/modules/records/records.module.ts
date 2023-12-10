import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { InjectionService } from '../injection/injection.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HemodialysisSession } from '../../entities/hemodialysisSession.entity';
import { Injection } from '../../entities/injection.entity';
import { AfterSession } from '../../entities/afterSession.entity';
import { HomeTreatment } from '../../entities/homeTreatment.entity';
import { Record } from '../../entities/record.entity';
import { MedicineService } from '../medicine/medicine.service';
import { Medicine } from '../../entities/medicine.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        HemodialysisSession,
        Record,
        Injection,
        AfterSession,
        HomeTreatment,
        Medicine,
      ],
    }),
  ],
  controllers: [RecordsController],
  providers: [RecordsService, InjectionService, MedicineService],
})
export class RecordsModule {}

import { Module } from '@nestjs/common';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {DbConfig} from "./config/db.config";
import { MedicineModule } from './modules/medicine/medicine.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { RecordsModule } from './modules/records/records.module';
import { HandbookModule } from './modules/handbook/handbook.module';
import { InjectionModule } from './modules/injection/injection.module';
@Module({
  imports: [
    MikroOrmModule.forRoot(DbConfig.getConfig()),
    MedicineModule,
    DoctorModule,
    RecordsModule,
    HandbookModule,
    InjectionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

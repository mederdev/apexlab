import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Injection } from '../../entities/injection.entity';
import { Medicine } from '../../entities/medicine.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Injection, Medicine],
    }),
  ],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}

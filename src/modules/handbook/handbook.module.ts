import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HandbookService } from './handbook.service';
import { HandbookController } from './handbook.controller';
import { Handbook } from '../../entities/handbook.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Handbook]
    })
  ],
  controllers: [HandbookController],
  providers: [HandbookService],
})
export class HandbookModule {}

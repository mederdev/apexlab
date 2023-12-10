import { Module } from '@nestjs/common';
import { InjectionService } from './injection.service';
import { InjectionController } from './injection.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Injection } from '../../entities/injection.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Injection],
    }),
  ],
  controllers: [InjectionController],
  providers: [InjectionService],
})
export class InjectionModule {}

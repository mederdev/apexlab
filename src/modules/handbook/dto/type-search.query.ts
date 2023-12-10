import { HandbookEnum } from '../../../common/enums/handbook.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TypeSearchQuery {
  @ApiProperty({
    type: String,
    description: 'Тип справочника:',
    required: false
  })
  @IsString()
  @IsOptional()
  @IsEnum(HandbookEnum)
  type: HandbookEnum
}

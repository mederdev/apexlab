import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InjectionEnum } from '../../../common/enums/injection.enum';

export class InjectionSearchQuery {
  @ApiProperty({
    type: String,
    description: 'Тип:',
    required: false,
  })
  @IsString()
  @IsEnum(InjectionEnum)
  @IsOptional()
  type: InjectionEnum;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { InjectionTypesEnum } from '../../../common/enums/injection-types.enum';
import { InjectionEnum } from '../../../common/enums/injection.enum';

export class CreateInjectionDto {
  @ApiProperty({
    type: String,
    description: 'Название инъекции:',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Тип иглы:',
    enum: InjectionTypesEnum,
  })
  @IsString()
  @IsEnum(InjectionTypesEnum)
  injectionType: InjectionTypesEnum;

  @ApiProperty({
    type: Number,
    description: 'Размер инъекции:',
  })
  @IsNumber()
  size: number;

  @ApiProperty({
    type: String,
    description: 'Тип инъекции:',
    enum: InjectionEnum,
  })
  @IsString()
  @IsEnum(InjectionEnum)
  type: InjectionEnum;
}

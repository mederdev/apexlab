import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { InjectionTypesEnum } from '../../../common/enums/injection-types.enum';

export class UpdateInjectionDto {
  @ApiProperty({
    type: String,
    description: 'Название инъекции:'
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Тип иглы:'
  })
  @IsString()
  @IsEnum(InjectionTypesEnum)
  @IsOptional()
  injectionType: InjectionTypesEnum;

  @ApiProperty({
    type: Number,
    description: 'Размер инъекции:'
  })
  @IsNumber()
  @IsOptional()
  size: number;
}

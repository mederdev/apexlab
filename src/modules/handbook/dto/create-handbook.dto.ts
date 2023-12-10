import { HandbookEnum } from '../../../common/enums/handbook.enum';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHandbookDto {
  @ApiProperty({
    type: String,
    description: 'Название справочника:'
  })
  @IsString()
  @MaxLength(128)
  name: string;

  @ApiProperty({
    type: String,
    description: 'Описание справочника:'
  })
  @IsString()
  @MaxLength(2048)
  description: string;

  @ApiProperty({
    type: String,
    description: 'Тип справочника:'
  })
  @IsString()
  @IsEnum(HandbookEnum)
  type: HandbookEnum;
}

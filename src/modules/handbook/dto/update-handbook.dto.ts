import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHandbookDto {
  @ApiProperty({
    type: String,
    description: 'Название справочника:'
  })
  @IsString()
  @IsOptional()
  @MaxLength(128)
  name: string;

  @ApiProperty({
    type: String,
    description: 'Описание справочника:'
  })
  @IsString()
  @IsOptional()
  @MaxLength(2048)
  description: string;
}

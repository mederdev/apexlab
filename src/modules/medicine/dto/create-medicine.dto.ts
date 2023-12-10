import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicineDto {
  @ApiProperty()
  @IsString()
  @MaxLength(128)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(2048)
  description: string;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  manufacturer: string;
}

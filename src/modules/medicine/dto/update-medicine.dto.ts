import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMedicineDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(128)
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(2048)
  description: string;
}

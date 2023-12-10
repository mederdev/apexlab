import { IsNumber, IsOptional, IsString, Max, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDoctorDto {
  @ApiProperty({
    type: String,
    description: 'Имя доктора:'
  })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  name: string

  @ApiProperty({
    type: Number,
    description: 'Возраст доктора:'
  })
  @IsNumber()
  @Max(256)
  @IsOptional()
  age: number

  @ApiProperty({
    type: String,
    description: 'Специальность доктора:'
  })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  specialization: string
}

import { IsNumber, IsString, Max, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({
    type: String,
    description: 'Имя доктора:'
  })
  @IsString()
  @MaxLength(64)
  name: string

  @ApiProperty({
    type: Number,
    description: 'Возраст доктора:'
  })
  @IsNumber()
  @Max(256)
  age: number

  @ApiProperty({
    type: String,
    description: 'Специальность доктора:'
  })
  @IsString()
  @MaxLength(256)
  specialization: string
}

import { IsArray, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecordDto {
  @ApiProperty()
  @IsNumber()
  hemodialysisSessionsId: number;

  @ApiProperty()
  @IsArray()
  afterSessions: number[];

  @ApiProperty()
  @IsArray()
  homeTreatments: number[];

  @ApiProperty()
  @IsNumber()
  doctorId: number;

  @ApiProperty()
  @IsArray()
  recommendations: string[];

  @ApiProperty()
  @IsDateString()
  date: Date;
}

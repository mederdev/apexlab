import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdateRecordDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  hemodialysisSessionsId: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  afterSessions: number[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  homeTreatments: number[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  doctorId: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  recommendations: string[];

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  date: Date;
}

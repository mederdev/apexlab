import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAfterSessionDto {
  @ApiProperty()
  @IsNumber()
  medicinesId: number;

  @ApiProperty()
  @IsString()
  receptionPath: string;

  @ApiProperty()
  @IsString()
  dosage: string;

  @ApiProperty()
  @IsArray()
  sessionNumbers: number[];

  @ApiProperty()
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsDateString()
  end: Date;
}

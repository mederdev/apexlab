import { IsEnum, IsNumber, IsString } from 'class-validator';
import { InjectionEnum } from '../../../common/enums/injection.enum';
import { ProgramApparatusEnum } from '../../../common/enums/program-apparatus.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHemodialysisSessionDto {
  @ApiProperty()
  @IsString()
  @IsEnum(ProgramApparatusEnum)
  programApparatus: ProgramApparatusEnum;

  @ApiProperty()
  @IsString()
  dialyzer: string;

  @ApiProperty()
  @IsString()
  concentrator: string;

  @ApiProperty()
  @IsNumber()
  concentratorVolume: number;

  @ApiProperty()
  @IsString()
  @IsEnum(InjectionEnum)
  injectionType: InjectionEnum;

  @ApiProperty()
  @IsNumber()
  injectionId: number;

  @ApiProperty()
  @IsString()
  bicarbonate: string;

  @ApiProperty()
  @IsNumber()
  patientWeight: number;

  @ApiProperty()
  @IsString()
  anticoagulation: string;

  @ApiProperty()
  @IsNumber()
  anticoagulationVolume: number;
}

import { IsOptional, IsString, MaxLength } from 'class-validator';

export class MedicineSearchQuery {
  @IsString()
  @IsOptional()
  @MaxLength(128)
  name: string;
}

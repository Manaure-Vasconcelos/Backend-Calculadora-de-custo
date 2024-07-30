import { IsNumber, IsOptional } from 'class-validator';

export abstract class ProfileUpdatingDTO {
  @IsNumber()
  @IsOptional()
  fixedCosts?: number;

  @IsNumber()
  @IsOptional()
  daysOfWorking?: number;

  @IsNumber()
  @IsOptional()
  salesPerDay?: number;
}

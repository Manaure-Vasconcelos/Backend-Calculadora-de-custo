import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export abstract class IngredientUpdatingDTO {
  @IsString()
  @IsOptional()
  @Length(2, 50)
  name: string;

  @IsOptional()
  @IsNumber()
  marketWeight: number;

  @IsOptional()
  @IsNumber()
  marketPrice: number;

  @IsNumber()
  @IsOptional()
  grossWeight: number;
}

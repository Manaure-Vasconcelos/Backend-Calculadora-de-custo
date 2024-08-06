import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export abstract class IngredientUpdatingDTO {
  @IsString()
  @IsOptional()
  @Length(2, 50)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  usedWeight: number;

  @IsNotEmpty()
  @IsNumber()
  marketPrice: number;

  @IsNumber()
  @IsNotEmpty()
  grossWeight: number;

  @IsNumber()
  @IsNotEmpty()
  recipeId: number;
}

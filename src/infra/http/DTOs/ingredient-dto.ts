import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export abstract class IngredientDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  marketWeight: number;

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

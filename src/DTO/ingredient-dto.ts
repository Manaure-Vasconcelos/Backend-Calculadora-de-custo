import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export abstract class IngredientDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
s
  @IsNotEmpty()
  @IsNumber()
  marketWeight: number;

  @IsNotEmpty()
  @IsNumber()
  marketPrice: number;

  @IsNumber()
  @IsNotEmpty()
  grossWeight: number;

  _realAmount?: number;
  id?: number;
}

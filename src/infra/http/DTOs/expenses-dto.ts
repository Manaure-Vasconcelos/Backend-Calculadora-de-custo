import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export abstract class ExpensesDTO {
  @IsNumber()
  @IsOptional()
  valuePartial?: number;

  @IsNumber()
  @IsOptional()
  serving?: number;

  @IsNumber()
  @IsOptional()
  pack?: number;

  @IsNumber()
  @IsOptional()
  profit?: number;

  @IsNumber()
  @IsNotEmpty()
  recipeId: number;
}

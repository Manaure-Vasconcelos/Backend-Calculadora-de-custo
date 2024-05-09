import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export abstract class RecipesUpdatingDTO {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  title?: string;

  @IsOptional()
  @IsString()
  describe?: string;

  @IsOptional()
  @IsNumber()
  valuePartial?: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

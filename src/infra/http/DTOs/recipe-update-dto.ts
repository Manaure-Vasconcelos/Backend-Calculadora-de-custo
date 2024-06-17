import { IsOptional, IsString, Length } from 'class-validator';

export abstract class RecipesUpdatingDTO {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  title?: string;

  @IsOptional()
  @IsString()
  describe?: string;
}

import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export abstract class RecipesDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  title: string;

  @IsOptional()
  @IsString()
  describe?: string;
}

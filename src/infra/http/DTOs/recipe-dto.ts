import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export abstract class RecipesDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  describe: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

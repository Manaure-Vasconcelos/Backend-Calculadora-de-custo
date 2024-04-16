import { IsEmail, IsNotEmpty, IsNumber, Max, MinLength } from 'class-validator';

export abstract class UsersDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Max(20)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @MinLength(6)
  name: string;

  @IsNotEmpty()
  age: number;
}

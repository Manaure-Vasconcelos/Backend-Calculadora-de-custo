import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export abstract class LoginUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

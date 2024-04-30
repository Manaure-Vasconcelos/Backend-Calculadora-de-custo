import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export abstract class userDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password_hash: string;
}

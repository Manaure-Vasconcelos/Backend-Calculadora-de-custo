import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export abstract class UserUpdatingDTO {
  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;
}

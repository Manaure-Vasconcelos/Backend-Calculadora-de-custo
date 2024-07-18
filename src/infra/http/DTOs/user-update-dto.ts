import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export abstract class UserUpdatingDTO {
  @IsString()
  @MinLength(2)
  @IsOptional()
  name: string | undefined;

  @IsEmail()
  @IsOptional()
  email: string | undefined;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password: string | undefined;

  @IsString()
  @IsOptional()
  avatarURL: string | undefined;
}

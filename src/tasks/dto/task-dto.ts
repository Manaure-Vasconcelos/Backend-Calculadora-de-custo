import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export abstract class TaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}

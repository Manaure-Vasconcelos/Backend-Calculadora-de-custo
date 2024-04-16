import { IsNotEmpty, IsString } from 'class-validator';

export abstract class TaskPutDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  status?: boolean;
}

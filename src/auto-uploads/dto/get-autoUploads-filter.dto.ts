import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from './status.enum';

export class GetAutoUploadsFilterDto {
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsString()
  search?: string;
}

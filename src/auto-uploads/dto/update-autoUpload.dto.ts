import { IsNotEmpty } from 'class-validator';
import { IsEnum } from 'class-validator';
import { Status } from './status.enum';

export class UpdateAutoUploadDto {
  @IsNotEmpty()
  destination: string;

  @IsEnum(Status)
  status: Status;
}

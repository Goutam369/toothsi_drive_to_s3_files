import { IsNotEmpty } from 'class-validator';

export class CreateAutoUploadDto {
  @IsNotEmpty()
  source: string;
}

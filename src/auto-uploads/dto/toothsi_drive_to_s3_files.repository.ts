import { EntityRepository, Repository } from 'typeorm';
import { toothsi_drive_to_s3_files } from './toothsi_drive_to_s3_files.entity';

// @EntityRepository(AutoUpload)
@EntityRepository(toothsi_drive_to_s3_files)
export class Toothsi_drive_to_s3_files extends Repository<toothsi_drive_to_s3_files> {}
